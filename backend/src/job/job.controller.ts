import e, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { startSession } from "mongoose";
import { sendEmail } from "../util/emailServer";

import Job from "./job.model";
import userService from "../user/user.service";
import jobService from "./job.service";
import constants from "../constant";

import CustomResponse from "../util/response";
import NotFoundError from "../error/error.classes/NotFoundError";
import emailTemplates from "../util/email-templates/email.templates";

const PublishJob = async (req: Request, res: Response) => {
  const auth: any = req.auth;
  const body: any = req.body;

  //check if the organization exists
  const user: any = await userService.findById(auth._id);

  if (!user.organization) throw new NotFoundError("Organization not found!");

  const newJob = new Job(body);

  //construct the job object
  newJob.organization = user.organization._id;
  newJob.addedBy = auth._id;

  const session = await startSession();
  let createdJob: any = null;
  try {
    session.startTransaction();

    createdJob = await jobService.save(newJob, session);

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  CustomResponse(
    res,
    true,
    StatusCodes.CREATED,
    "Job created successfully",
    createdJob
  );
};

const GetAllJobs = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  let jobs: any = null;

  if (auth.role === constants.USER.ROLES.ADMIN) {
    jobs = await jobService.findAllJobsByAddedBy(auth._id);
  } else {
    jobs = await jobService.findAllJobs();
  }

  CustomResponse(res, true, StatusCodes.OK, "Jobs fetched successfully", jobs);
};

const UpdateJob = async (req: Request, res: Response) => {
  const jobId = req.params.jobId;
  const auth: any = req.auth;
  const body: any = req.body;

  const job: any = await jobService.findById(jobId);

  if (!job) throw new NotFoundError("Job not found!");

  if (job.addedBy.toString() !== auth._id.toString())
    throw new NotFoundError("You are not authorized to update this job!");

  //construct the update job object
  for (let key in body) {
    if (key !== "addedBy") {
      job[key] = body[key];
    }
  }

  let updatedJob: any = null;

  try {
    updatedJob = await jobService.save(job, null);
  } catch (e) {
    throw e;
  }

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Job updated successfully!",
    updatedJob
  );
};

const DeleteJob = async (req: Request, res: Response) => {
  const jobId = req.params.jobId;
  const auth: any = req.auth;

  const job: any = await jobService.findById(jobId);

  if (!job) throw new NotFoundError("Job not found!");

  if (job.addedBy.toString() !== auth._id.toString())
    throw new NotFoundError("You are not authorized to delete this job!");

  job.status = constants.WELLKNOWNSTATUS.DELETED;

  await jobService.save(job, null);

  CustomResponse(res, true, StatusCodes.OK, "Job deleted successfully!", {});
};

const ApplyForJob = async (req: Request, res: Response) => {
  const jobId = req.params.jobId;
  const body: any = req.body;
  const file: any = req.file;
  const auth: any = req.auth;

  if (!file) throw new NotFoundError("Please upload a resume!"); //validate file

  const job: any = await jobService.findById(jobId); //check if the job exists

  if (!job) throw new NotFoundError("Job not found!");

  const user: any = await userService.findById(auth._id);

  let isUserApplied = user.appliedJobs.includes(jobId); //check if the user has already applied for this job

  if (isUserApplied) throw new NotFoundError("You have already applied!");

  //construct the user object
  user.appliedJobs.push(jobId);

  try {
    await userService.save(user, null);
  } catch (e) {
    throw e;
  }

  let data: any = {
    fullName: body.fullName,
    mobileNumber: body.mobileNumber,
    title: job.title,
    companyName: job.organization.orgName,
  };

  let companyMailBody = emailTemplates.ApplyJobMail(data);
  let userMailBody = emailTemplates.ApplyJobResponseMail(data);

  //send email to the company
  await sendEmail(
    job.organization.orgEmail,
    "Job Application Request Alert",
    companyMailBody,
    file
  );

  //send email to the user
  await sendEmail(body.email, "Job Application Response", userMailBody, null);

  CustomResponse(res, true, StatusCodes.OK, "Job applied successfully!", {});
};

const SaveJob = async (req: Request, res: Response) => {
  const jobId = req.params.jobId;
  const auth: any = req.auth;

  const job: any = await jobService.findById(jobId);

  if (!job) throw new NotFoundError("Job not found!");

  const user: any = await userService.findById(auth._id);

  let isUserSaved = user.savedJobs.includes(jobId);

  if (isUserSaved) throw new NotFoundError("You have already saved this job!");

  //construct the user object
  user.savedJobs.push(jobId);

  try {
    await userService.save(user, null);
  } catch (e) {
    throw e;
  }

  CustomResponse(res, true, StatusCodes.OK, "Job saved successfully!", {});
};

const RemoveSavedJob = async (req: Request, res: Response) => {
  const jobId = req.params.jobId;
  const auth: any = req.auth;

  const job: any = await jobService.findById(jobId);

  if (!job) throw new NotFoundError("Job not found!");

  const user: any = await userService.findById(auth._id);

  let isUserSaved = user.savedJobs.includes(jobId);

  if (!isUserSaved) throw new NotFoundError("You have not saved this job!");

  //construct the user object
  user.savedJobs = user.savedJobs.filter(
    (job: any) => job.toString() !== jobId
  );

  try {
    await userService.save(user, null);
  } catch (e) {
    throw e;
  }

  CustomResponse(res, true, StatusCodes.OK, "Job removed successfully!", {});
};

const GetAllAppliedJobs = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  let appliedJobs: any = await userService.findAllAppliedJobs(auth._id);

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Applied jobs fetched successfully!",
    appliedJobs.appliedJobs
  );
};

const GetAllSavedJobs = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  let savedJobs: any = await userService.findAllSavedJobs(auth._id);

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Saved jobs fetched successfully!",
    savedJobs.savedJobs
  );
};

export {
  PublishJob,
  GetAllJobs,
  UpdateJob,
  DeleteJob,
  ApplyForJob,
  SaveJob,
  RemoveSavedJob,
  GetAllAppliedJobs,
  GetAllSavedJobs,
};
