"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const constant_1 = __importDefault(require("../constant"));
const job_controller_1 = require("./job.controller");
const common_middleware_1 = __importDefault(require("../common/common.middleware"));
const JobRouter = (0, express_1.Router)();
JobRouter.post("/create", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), job_controller_1.PublishJob);
JobRouter.get("/allJobs", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), job_controller_1.GetAllJobs);
JobRouter.patch("/update/:jobId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), job_controller_1.UpdateJob);
JobRouter.put("/delete/:jobId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), job_controller_1.DeleteJob);
JobRouter.post("/apply/:jobId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), common_middleware_1.default.multerUploader.single("resume"), job_controller_1.ApplyForJob);
JobRouter.put("/save/:jobId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), job_controller_1.SaveJob);
JobRouter.put("/removeSave/:jobId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), job_controller_1.RemoveSavedJob);
JobRouter.get("/getAppliedJobs", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), job_controller_1.GetAllAppliedJobs);
JobRouter.get("/getSavedJobs", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), job_controller_1.GetAllSavedJobs);
exports.default = JobRouter;
