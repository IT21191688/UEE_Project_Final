import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";

import {
  PublishJob,
  GetAllJobs,
  UpdateJob,
  DeleteJob,
  ApplyForJob,
  SaveJob,
  RemoveSavedJob,
  GetAllAppliedJobs,
  GetAllSavedJobs,
} from "./job.controller";
import commonMiddleware from "../common/common.middleware";

const JobRouter = Router();

JobRouter.post(
  "/create",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  PublishJob
);

JobRouter.get(
  "/allJobs",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetAllJobs
);

JobRouter.patch(
  "/update/:jobId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  UpdateJob
);

JobRouter.put(
  "/delete/:jobId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteJob
);

JobRouter.post(
  "/apply/:jobId",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  commonMiddleware.multerUploader.single("resume"),
  ApplyForJob
);

JobRouter.put(
  "/save/:jobId",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  SaveJob
);

JobRouter.put(
  "/removeSave/:jobId",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  RemoveSavedJob
);

JobRouter.get(
  "/getAppliedJobs",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  GetAllAppliedJobs
);

JobRouter.get(
  "/getSavedJobs",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  GetAllSavedJobs
);
export default JobRouter;
