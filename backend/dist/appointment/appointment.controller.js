"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppointmentDetailsAdmin = exports.GetAllAppointmentsAdmin = exports.GetAppointmentDetails = exports.DeleteAppointment = exports.UpdateAppointment = exports.ApproveOrRejectAppointment = exports.GetAllAppointments = exports.GetAvailableSlots = exports.CreateAppointment = void 0;
const http_status_codes_1 = require("http-status-codes");
const appointment_util_1 = require("./appointment.util");
const appointment_service_1 = __importDefault(require("./appointment.service"));
const organization_service_1 = __importDefault(require("../organization/organization.service"));
const user_service_1 = __importDefault(require("../user/user.service"));
const email_templates_1 = __importDefault(require("../util/email-templates/email.templates"));
const appointment_model_1 = __importDefault(require("./appointment.model"));
const response_1 = __importDefault(require("../util/response"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const constant_1 = __importDefault(require("../constant"));
const emailServer_1 = require("../util/emailServer");
const BadRequestError_1 = __importDefault(require("../error/error.classes/BadRequestError"));
const ForbiddenError_1 = __importDefault(require("../error/error.classes/ForbiddenError"));
const CreateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const body = req.body;
    const auth = req.auth;
    const organization = yield organization_service_1.default.findById(body.organization); //validate organization
    const user = yield user_service_1.default.findById(auth._id);
    const userEmail = (_a = user === null || user === void 0 ? void 0 : user.email) !== null && _a !== void 0 ? _a : ''; // Use a default value when email is undefined
    console.log(userEmail);
    if (!user)
        throw new NotFoundError_1.default("User not found!");
    if (!organization)
        throw new NotFoundError_1.default("Organization not found!");
    const validateAppointments = yield appointment_service_1.default.findAllByOrgAndDateAndTimeSlot(body.organization, new Date(body.appointmentDate), body.appointmentTime);
    if (validateAppointments.length > 0)
        throw new BadRequestError_1.default("Time slot is already booked!");
    const newAppointment = new appointment_model_1.default({
        title: body.title,
        description: body.description,
        appointmentDate: new Date(body.appointmentDate),
        appointmentTime: body.appointmentTime,
        organization: body.organization,
        addedBy: auth._id,
    });
    let createdAppointment = null;
    try {
        createdAppointment = yield appointment_service_1.default.save(newAppointment, null);
        //send email to organization
        let data = {
            orgName: body.title,
            appointmentDate: body.appointmentDate,
            appointmentTime: body.appointmentTime,
        };
        let htmlBody = email_templates_1.default.NewAppointmentAlertTemplate(data);
        let data1 = {
            orgName: organization.orgName,
            appointmentDate: newAppointment.appointmentDate,
            appointmentTime: (_b = appointment_util_1.timeSlots.find((time) => {
                return time.id === newAppointment.appointmentTime;
            })) === null || _b === void 0 ? void 0 : _b.timeSlot,
        };
        let htmlBody1 = email_templates_1.default.NewAppointmentAlertTemplate(data1);
        yield (0, emailServer_1.sendEmail)(organization.orgEmail, "New Appointment Alert", htmlBody1, null);
        yield (0, emailServer_1.sendEmail)(userEmail, "Appointment Create Successfully", htmlBody, null);
    }
    catch (e) {
        throw e;
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Appointment created successfully!", createdAppointment);
});
exports.CreateAppointment = CreateAppointment;
const GetAvailableSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date(req.query.date);
    const organizationId = req.query.organization;
    const appointments = yield appointment_service_1.default.findAllByOrgAndDate(organizationId, date);
    let availableSlots = appointment_util_1.timeSlots;
    appointments.forEach((appointment) => {
        let index = appointment_util_1.timeSlots.findIndex((time) => {
            return time.id === appointment.appointmentTime;
        });
        if (index !== -1) {
            availableSlots.splice(index, 1);
        }
    });
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Available slots fetched successfully!", availableSlots);
});
exports.GetAvailableSlots = GetAvailableSlots;
const GetAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    yield (0, appointment_util_1.disableExpiredAppointments)();
    let appointments = null;
    if (auth.role == constant_1.default.USER.ROLES.ADMIN) {
        const user = yield user_service_1.default.findById(auth._id);
        appointments = yield appointment_service_1.default.findAllByOrg(user.organization);
        //appointments=await appointmentService.findAllAppointments();
    }
    else {
        appointments = yield appointment_service_1.default.findAllByAddedBy(auth._id);
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Appointments fetched successfully!", appointments);
});
exports.GetAllAppointments = GetAllAppointments;
const GetAllAppointmentsAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    yield (0, appointment_util_1.disableExpiredAppointments)();
    let appointments = null;
    if (auth.role == constant_1.default.USER.ROLES.ADMIN) {
        appointments = yield appointment_service_1.default.findAllAppointments();
    }
    else {
        appointments = yield appointment_service_1.default.findAllByAddedBy(auth._id);
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Appointments fetched successfully!", appointments);
});
exports.GetAllAppointmentsAdmin = GetAllAppointmentsAdmin;
const ApproveOrRejectAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const appointmentId = req.params.appointmentId;
    const status = req.query.status;
    const appointment = yield appointment_service_1.default.findById(appointmentId);
    if (!appointment)
        throw new NotFoundError_1.default("Appointment not found!");
    if (appointment.status != constant_1.default.WELLKNOWNSTATUS.PENDING)
        throw new BadRequestError_1.default("Appointment is already approved or rejected!");
    const user = yield user_service_1.default.findByOrganization(appointment.organization);
    if (!user)
        throw new NotFoundError_1.default("Organization not found!");
    /*
    if (user._id.toString() != req.auth._id)
      throw new ForbiddenError("You are not authorized to perform this action!");
    */
    const addedUser = yield user_service_1.default.findById(appointment.addedBy);
    let data = {
        userName: addedUser.fullName,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: (_c = appointment_util_1.timeSlots.find((time) => {
            return time.id === appointment.appointmentTime;
        })) === null || _c === void 0 ? void 0 : _c.timeSlot,
    };
    let htmlBody = null;
    try {
        switch (Number(status)) {
            case constant_1.default.WELLKNOWNSTATUS.APPROVE:
                appointment.status = constant_1.default.WELLKNOWNSTATUS.APPROVE;
                yield appointment_service_1.default.save(appointment, null);
                htmlBody = email_templates_1.default.AppointmentApprovedTemplate(data);
                yield (0, emailServer_1.sendEmail)(addedUser.email, "Your Appointment Approved", htmlBody, null);
                (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Appointment approved successfully!", null);
                break;
            case constant_1.default.WELLKNOWNSTATUS.REJECT:
                appointment.status = constant_1.default.WELLKNOWNSTATUS.REJECT;
                yield appointment_service_1.default.save(appointment, null);
                htmlBody = email_templates_1.default.AppointmentRejectedTemplate(data);
                yield (0, emailServer_1.sendEmail)(addedUser.email, "Your Appointment Rejected", htmlBody, null);
                (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Appointment rejected successfully!", null);
                break;
            default:
                throw new NotFoundError_1.default("Invalid status!");
        }
    }
    catch (e) {
        throw e;
    }
});
exports.ApproveOrRejectAppointment = ApproveOrRejectAppointment;
const UpdateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentID = req.params.appointmentId;
    const auth = req.auth;
    const body = req.body;
    const appointment = yield appointment_service_1.default.findById(appointmentID);
    if (!appointment)
        throw new NotFoundError_1.default("Appointment not found!");
    let today = new Date();
    if (appointment.appointmentDate < today)
        throw new BadRequestError_1.default("Appointment date is already passed!");
    if (appointment.status != constant_1.default.WELLKNOWNSTATUS.PENDING)
        throw new BadRequestError_1.default("Appointment is already approved or rejected!");
    if (appointment.addedBy.toString() != auth._id)
        throw new ForbiddenError_1.default("You are not authorized to perform this action!");
    for (let key in body) {
        if (key !== "addedBy") {
            appointment[key] = body[key];
        }
    }
    try {
        yield appointment_service_1.default.save(appointment, null);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Appointment updated successfully!", appointment);
    }
    catch (e) {
        throw e;
    }
});
exports.UpdateAppointment = UpdateAppointment;
const DeleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentID = req.params.appointmentId;
    const auth = req.auth;
    const appointment = yield appointment_service_1.default.findById(appointmentID);
    console.log(appointmentID);
    if (!appointment)
        throw new NotFoundError_1.default("Appointment not found!");
    /*
    if (appointment.addedBy.toString() != auth._id)
      throw new ForbiddenError("You are not authorized to perform this action!");
  
      */
    appointment.status = constant_1.default.WELLKNOWNSTATUS.DELETED;
    try {
        yield appointment_service_1.default.save(appointment, null);
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Appointment deleted successfully!", null);
    }
    catch (e) {
        throw e;
    }
});
exports.DeleteAppointment = DeleteAppointment;
const GetAppointmentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentID = req.params.appointmentId;
        const auth = req.auth;
        // Use your appointmentService to find the appointment by ID
        const appointment = yield appointment_service_1.default.findById(appointmentID);
        if (!appointment) {
            throw new NotFoundError_1.default("Appointment not found!");
        }
        if (appointment.addedBy.toString() !== auth._id) {
            throw new ForbiddenError_1.default("You are not authorized to view this appointment!");
        }
        // Handle your response here, returning the appointment details
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Appointment details retrieved successfully!", appointment);
    }
    catch (e) {
        // Handle any errors that may occur during the process
        throw e;
    }
});
exports.GetAppointmentDetails = GetAppointmentDetails;
const GetAppointmentDetailsAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentID = req.params.appointmentId;
        const auth = req.auth;
        // Use your appointmentService to find the appointment by ID
        const appointment = yield appointment_service_1.default.findById(appointmentID);
        if (!appointment) {
            throw new NotFoundError_1.default("Appointment not found!");
        }
        if (!appointment) {
            throw new NotFoundError_1.default("Appointment not found!");
        }
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Appointment details fetched successfully", appointment);
    }
    catch (error) {
        // Handle errors here and send an appropriate response
        console.error(error);
        // Return an error response, for example:
        (0, response_1.default)(res, false, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Failed to fetch appointment details", null);
    }
});
exports.GetAppointmentDetailsAdmin = GetAppointmentDetailsAdmin;
