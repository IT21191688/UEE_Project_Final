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
exports.GetAllSavedJobs = exports.GetAllAppliedJobs = exports.RemoveSavedJob = exports.SaveJob = exports.ApplyForJob = exports.DeleteJob = exports.UpdateJob = exports.GetAllJobs = exports.PublishJob = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const emailServer_1 = require("../util/emailServer");
const job_model_1 = __importDefault(require("./job.model"));
const user_service_1 = __importDefault(require("../user/user.service"));
const job_service_1 = __importDefault(require("./job.service"));
const constant_1 = __importDefault(require("../constant"));
const response_1 = __importDefault(require("../util/response"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const email_templates_1 = __importDefault(require("../util/email-templates/email.templates"));
const PublishJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    const body = req.body;
    //check if the organization exists
    const user = yield user_service_1.default.findById(auth._id);
    if (!user.organization)
        throw new NotFoundError_1.default("Organization not found!");
    const newJob = new job_model_1.default(body);
    //construct the job object
    newJob.organization = user.organization._id;
    newJob.addedBy = auth._id;
    const session = yield (0, mongoose_1.startSession)();
    let createdJob = null;
    try {
        session.startTransaction();
        createdJob = yield job_service_1.default.save(newJob, session);
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Job created successfully", createdJob);
});
exports.PublishJob = PublishJob;
const GetAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    let jobs = null;
    if (auth.role === constant_1.default.USER.ROLES.ADMIN) {
        jobs = yield job_service_1.default.findAllJobsByAddedBy(auth._id);
    }
    else {
        jobs = yield job_service_1.default.findAllJobs();
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Jobs fetched successfully", jobs);
});
exports.GetAllJobs = GetAllJobs;
const UpdateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.jobId;
    const auth = req.auth;
    const body = req.body;
    const job = yield job_service_1.default.findById(jobId);
    if (!job)
        throw new NotFoundError_1.default("Job not found!");
    if (job.addedBy.toString() !== auth._id.toString())
        throw new NotFoundError_1.default("You are not authorized to update this job!");
    //construct the update job object
    for (let key in body) {
        if (key !== "addedBy") {
            job[key] = body[key];
        }
    }
    let updatedJob = null;
    try {
        updatedJob = yield job_service_1.default.save(job, null);
    }
    catch (e) {
        throw e;
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Job updated successfully!", updatedJob);
});
exports.UpdateJob = UpdateJob;
const DeleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.jobId;
    const auth = req.auth;
    const job = yield job_service_1.default.findById(jobId);
    if (!job)
        throw new NotFoundError_1.default("Job not found!");
    if (job.addedBy.toString() !== auth._id.toString())
        throw new NotFoundError_1.default("You are not authorized to delete this job!");
    job.status = constant_1.default.WELLKNOWNSTATUS.DELETED;
    yield job_service_1.default.save(job, null);
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Job deleted successfully!", {});
});
exports.DeleteJob = DeleteJob;
const ApplyForJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.jobId;
    const body = req.body;
    const file = req.file;
    const auth = req.auth;
    if (!file)
        throw new NotFoundError_1.default("Please upload a resume!"); //validate file
    const job = yield job_service_1.default.findById(jobId); //check if the job exists
    if (!job)
        throw new NotFoundError_1.default("Job not found!");
    const user = yield user_service_1.default.findById(auth._id);
    let isUserApplied = user.appliedJobs.includes(jobId); //check if the user has already applied for this job
    if (isUserApplied)
        throw new NotFoundError_1.default("You have already applied!");
    //construct the user object
    user.appliedJobs.push(jobId);
    try {
        yield user_service_1.default.save(user, null);
    }
    catch (e) {
        throw e;
    }
    let data = {
        fullName: body.fullName,
        mobileNumber: body.mobileNumber,
        title: job.title,
        companyName: job.organization.orgName,
    };
    let companyMailBody = email_templates_1.default.ApplyJobMail(data);
    let userMailBody = email_templates_1.default.ApplyJobResponseMail(data);
    //send email to the company
    yield (0, emailServer_1.sendEmail)(job.organization.orgEmail, "Job Application Request Alert", companyMailBody, file);
    //send email to the user
    yield (0, emailServer_1.sendEmail)(body.email, "Job Application Response", userMailBody, null);
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Job applied successfully!", {});
});
exports.ApplyForJob = ApplyForJob;
const SaveJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.jobId;
    const auth = req.auth;
    const job = yield job_service_1.default.findById(jobId);
    if (!job)
        throw new NotFoundError_1.default("Job not found!");
    const user = yield user_service_1.default.findById(auth._id);
    let isUserSaved = user.savedJobs.includes(jobId);
    if (isUserSaved)
        throw new NotFoundError_1.default("You have already saved this job!");
    //construct the user object
    user.savedJobs.push(jobId);
    try {
        yield user_service_1.default.save(user, null);
    }
    catch (e) {
        throw e;
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Job saved successfully!", {});
});
exports.SaveJob = SaveJob;
const RemoveSavedJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobId = req.params.jobId;
    const auth = req.auth;
    const job = yield job_service_1.default.findById(jobId);
    if (!job)
        throw new NotFoundError_1.default("Job not found!");
    const user = yield user_service_1.default.findById(auth._id);
    let isUserSaved = user.savedJobs.includes(jobId);
    if (!isUserSaved)
        throw new NotFoundError_1.default("You have not saved this job!");
    //construct the user object
    user.savedJobs = user.savedJobs.filter((job) => job.toString() !== jobId);
    try {
        yield user_service_1.default.save(user, null);
    }
    catch (e) {
        throw e;
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Job removed successfully!", {});
});
exports.RemoveSavedJob = RemoveSavedJob;
const GetAllAppliedJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    let appliedJobs = yield user_service_1.default.findAllAppliedJobs(auth._id);
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Applied jobs fetched successfully!", appliedJobs.appliedJobs);
});
exports.GetAllAppliedJobs = GetAllAppliedJobs;
const GetAllSavedJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    let savedJobs = yield user_service_1.default.findAllSavedJobs(auth._id);
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Saved jobs fetched successfully!", savedJobs.savedJobs);
});
exports.GetAllSavedJobs = GetAllSavedJobs;
