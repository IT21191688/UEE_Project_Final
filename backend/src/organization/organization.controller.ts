import { Request, Response } from "express";
import organizationService from "./organization.service";
import { StatusCodes } from "http-status-codes";
import CustomResponse from "../util/response";
import userService from "../user/user.service";
import NotFoundError from "../error/error.classes/NotFoundError";

const GetAllOrganizations = async (req: Request, res: Response) => {
  const organizations = await organizationService.findAll();

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Organizations fetched successfully!",
    organizations
  );
};
//
const GetOrganizationById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const organization = await organizationService.findById(id);

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Organization fetched successfully!",
    organization
  );
};

const GetLoggedInUserOrganization = async (req: Request, res: Response) => {
  const auth: any = req.auth;

  const user: any = await userService.findById(auth._id);

  const organization = await organizationService.findById(user.organization);

  if (!organization) throw new NotFoundError("Organization not found!");

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Organization fetched successfully!",
    organization
  );
};

export {
  GetAllOrganizations,
  GetOrganizationById,
  GetLoggedInUserOrganization,
};
