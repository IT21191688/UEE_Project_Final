import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { timeSlots, disableExpiredAppointments } from "./appointment.util";
import appointmentService from "./appointment.service";
import organizationService from "../organization/organization.service";
import userService from "../user/user.service";
import emailTemplates from "../util/email-templates/email.templates";

import Appointment from "./appointment.model";
import CustomResponse from "../util/response";

import NotFoundError from "../error/error.classes/NotFoundError";
import constants from "../constant";
import { sendEmail } from "../util/emailServer";
import BadRequestError from "../error/error.classes/BadRequestError";
import ForbiddenError from "../error/error.classes/ForbiddenError";

const CreateAppointment = async (req: Request, res: Response) => {
  const body: any = req.body;
  const auth: any = req.auth;

  const organization: any = await organizationService.findById(
    body.organization
  ); //validate organization

  if (!organization) throw new NotFoundError("Organization not found!");

  const validateAppointments =
    await appointmentService.findAllByOrgAndDateAndTimeSlot(
      body.organization,
      new Date(body.appointmentDate),
      body.appointmentTime
    );

  if (validateAppointments.length > 0)
    throw new BadRequestError("Time slot is already booked!");

  const newAppointment = new Appointment({
    title: body.title,
    description: body.description,
    appointmentDate: new Date(body.appointmentDate),
    appointmentTime: body.appointmentTime,
    organization: body.organization,
    addedBy: auth._id,
  });

  let createdAppointment: any = null;
  try {
    createdAppointment = await appointmentService.save(newAppointment, null);

    //send email to organization
    let data = {
      orgName: organization.orgName,
      appointmentDate: newAppointment.appointmentDate,
      appointmentTime: timeSlots.find((time) => {
        return time.id === newAppointment.appointmentTime;
      })?.timeSlot,
    };
    let htmlBody = emailTemplates.NewAppointmentAlertTemplate(data);

    await sendEmail(
      organization.orgEmail,
      "New Appointment Alert",
      htmlBody,
      null
    );
  } catch (e) {
    throw e;
  }

  CustomResponse(
    res,
    true,
    StatusCodes.CREATED,
    "Appointment created successfully!",
    createdAppointment
  );
};

const GetAvailableSlots = async (req: Request, res: Response) => {
  const date: Date = new Date(req.query.date as string);
  const organizationId: string = req.query.organization as string;

  const appointments = await appointmentService.findAllByOrgAndDate(
    organizationId,
    date
  );

  let availableSlots: any = timeSlots;

  appointments.forEach((appointment: any) => {
    let index = timeSlots.findIndex((time) => {
      return time.id === appointment.appointmentTime;
    });

    if (index !== -1) {
      availableSlots.splice(index, 1);
    }
  });

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Available slots fetched successfully!",
    availableSlots
  );
};

const GetAllAppointments = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  await disableExpiredAppointments();

  let appointments: any = null;
  if (auth.role == constants.USER.ROLES.ADMIN) {
    const user: any = await userService.findById(auth._id);
    appointments = await appointmentService.findAllByOrg(user.organization);
  } else {
    appointments = await appointmentService.findAllByAddedBy(auth._id);
  }

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Appointments fetched successfully!",
    appointments
  );
};

const ApproveOrRejectAppointment = async (req: Request, res: Response) => {
  const appointmentId: string = req.params.appointmentId;
  const status: any = req.query.status;

  const appointment: any = await appointmentService.findById(appointmentId);

  if (!appointment) throw new NotFoundError("Appointment not found!");

  if (appointment.status != constants.WELLKNOWNSTATUS.PENDING)
    throw new BadRequestError("Appointment is already approved or rejected!");

  const user = await userService.findByOrganization(appointment.organization);

  if (!user) throw new NotFoundError("Organization not found!");

  if (user._id.toString() != req.auth._id)
    throw new ForbiddenError("You are not authorized to perform this action!");

  const addedUser: any = await userService.findById(appointment.addedBy);

  let data: any = {
    userName: addedUser.fullName,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: timeSlots.find((time) => {
      return time.id === appointment.appointmentTime;
    })?.timeSlot,
  };

  let htmlBody: any = null;
  try {
    switch (Number(status)) {
      case constants.WELLKNOWNSTATUS.APPROVE:
        appointment.status = constants.WELLKNOWNSTATUS.APPROVE;
        await appointmentService.save(appointment, null);

        htmlBody = emailTemplates.AppointmentApprovedTemplate(data);

        await sendEmail(
          addedUser.email,
          "Your Appointment Approved",
          htmlBody,
          null
        );

        CustomResponse(
          res,
          true,
          StatusCodes.OK,
          "Appointment approved successfully!",
          null
        );

        break;
      case constants.WELLKNOWNSTATUS.REJECT:
        appointment.status = constants.WELLKNOWNSTATUS.REJECT;
        await appointmentService.save(appointment, null);

        htmlBody = emailTemplates.AppointmentRejectedTemplate(data);

        await sendEmail(
          addedUser.email,
          "Your Appointment Rejected",
          htmlBody,
          null
        );

        CustomResponse(
          res,
          true,
          StatusCodes.OK,
          "Appointment rejected successfully!",
          null
        );

        break;
      default:
        throw new NotFoundError("Invalid status!");
    }
  } catch (e) {
    throw e;
  }
};

const UpdateAppointment = async (req: Request, res: Response) => {
  const appointmentID: any = req.params.appointmentId;
  const auth: any = req.auth;
  const body: any = req.body;

  const appointment: any = await appointmentService.findById(appointmentID);

  if (!appointment) throw new NotFoundError("Appointment not found!");

  let today = new Date();

  if (appointment.appointmentDate < today)
    throw new BadRequestError("Appointment date is already passed!");

  if (appointment.status != constants.WELLKNOWNSTATUS.PENDING)
    throw new BadRequestError("Appointment is already approved or rejected!");

  if (appointment.addedBy.toString() != auth._id)
    throw new ForbiddenError("You are not authorized to perform this action!");

  for (let key in body) {
    if (key !== "addedBy") {
      appointment[key] = body[key];
    }
  }

  try {
    await appointmentService.save(appointment, null);
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Appointment updated successfully!",
      appointment
    );
  } catch (e) {
    throw e;
  }
};

const DeleteAppointment = async (req: Request, res: Response) => {
  const appointmentID: any = req.params.appointmentId;
  const auth: any = req.auth;

  const appointment: any = await appointmentService.findById(appointmentID);

  if (!appointment) throw new NotFoundError("Appointment not found!");

  if (appointment.addedBy.toString() != auth._id)
    throw new ForbiddenError("You are not authorized to perform this action!");

  appointment.status = constants.WELLKNOWNSTATUS.DELETED;

  try {
    await appointmentService.save(appointment, null);
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "Appointment deleted successfully!",
      null
    );
  } catch (e) {
    throw e;
  }
};

export {
  CreateAppointment,
  GetAvailableSlots,
  GetAllAppointments,
  ApproveOrRejectAppointment,
  UpdateAppointment,
  DeleteAppointment,
};
