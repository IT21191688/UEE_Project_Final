import { Router } from "express";
import {
  GetAllOrganizations,
  GetOrganizationById,
  GetLoggedInUserOrganization,
} from "./organization.controller";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";

const OrganizationRouter = Router();

OrganizationRouter.get("/getAll", GetAllOrganizations);
OrganizationRouter.get("/getOrg/:id", GetOrganizationById);
OrganizationRouter.get(
  "/getUserOrg",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  GetLoggedInUserOrganization
);

export default OrganizationRouter;
