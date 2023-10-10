import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { startSession } from "mongoose";

import Certificate from "./certificate.model";
import categoryService from "../category/category.service";
import BadRequestError from "../error/error.classes/BadRequestError";
import certificateService from "./certificate.service";
import CustomResponse from "../util/response";
import constants from "../constant";

const RequestCertificates = async (req: Request, res: Response) => {
  const body: any = req.body;
  const auth: any = req.auth;

  const certificateType = await categoryService.findById(body.certificate);

  if (!certificateType)
    throw new BadRequestError("Certificate type not found!");

  const serviceType = await categoryService.findById(body.serviceType);

  if (!serviceType) throw new BadRequestError("Service type not found!");

  const newCertificateReq = new Certificate(body);
  newCertificateReq.addedBy = auth._id;

  let createdRequest: any = null;

  const session = await startSession(); //start mongoose session
  try {
    session.startTransaction(); //start transaction in session

    //save certificate request
    createdRequest = await certificateService.save(newCertificateReq, session);

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }

  CustomResponse(
    res,
    true,
    StatusCodes.CREATED,
    "Certificate request created successfully!",
    createdRequest
  );
};

const GetAllCertificates = async (req: Request, res: Response) => {
  const auth = req.auth;

  let allRequests: any = null;
  if (auth.role === constants.USER.ROLES.ADMIN) {
    allRequests = await certificateService.findAllApproveAndPending();
  } else {
    allRequests = await certificateService.findAllApprovePendingAndRejectByUser(
      auth._id
    );
  }

  CustomResponse(res, true, StatusCodes.OK, "", allRequests);
};

const ApproveRejectRequest = async (req: Request, res: Response) => {
  const certificateId = req.params.certificateId;
  const status = req.query.status;

  const requestCheck = await certificateService.findById(certificateId);

  if (!requestCheck)
    throw new BadRequestError("Certificate request not found!");

  if (requestCheck.status !== constants.WELLKNOWNSTATUS.PENDING)
    throw new BadRequestError(
      "Certificate request is already approved or rejected!"
    );

  let resData: any = null;
  switch (Number(status)) {
    case 3:
      requestCheck.status = constants.WELLKNOWNSTATUS.APPROVE;
      resData = "Certificate request approved successfully!";
      break;
    case 4:
      requestCheck.status = constants.WELLKNOWNSTATUS.REJECT;
      resData = "Certificate request rejected successfully!";
      break;
    default:
      throw new BadRequestError("Invalid status!");
  }

  await certificateService.save(requestCheck, null);

  CustomResponse(res, true, StatusCodes.OK, resData, null);
};

const DeleteRequest = async (req: Request, res: Response) => {
  const certificateId = req.params.certificateId;

  const requestCheck = await certificateService.findById(certificateId);

  if (!requestCheck)
    throw new BadRequestError("Certificate request not found!");

  if (requestCheck.addedBy?.toString() !== req.auth._id.toString())
    throw new BadRequestError("You are not authorized to delete this request!");

  requestCheck.status = constants.WELLKNOWNSTATUS.DELETED;

  await certificateService.save(requestCheck, null);

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Certificate request deleted successfully!",
    null
  );
};

const GetOneCertificate = async (req: Request, res: Response) => {
  const certificateId = req.params.certificateId;

  const certificate = await certificateService.findById(certificateId);

  if (!certificate) throw new BadRequestError("Certificate request not found!");

  CustomResponse(res, true, StatusCodes.OK, "", certificate);
};

const UpdateRequest = async (req: Request, res: Response) => {
  const certificateId = req.params.certificateId;
  const body: any = req.body;
  const auth: any = req.auth;

  const certificateRequest: any = await certificateService.findById(
    certificateId
  );

  if (!certificateRequest)
    throw new BadRequestError("Certificate request not found!");

  if (certificateRequest.addedBy?.toString() !== auth._id.toString())
    throw new BadRequestError("You are not authorized to update this request!");

  if (certificateRequest.status !== constants.WELLKNOWNSTATUS.PENDING)
    throw new BadRequestError(
      "Certificate request is already approved or rejected!"
    );

  if (body.certificate) {
    const checkCertificate = await categoryService.findById(body.certificate);

    if (!checkCertificate)
      throw new BadRequestError("Certificate type not found!");
  }

  if (body.serviceType) {
    const checkServiceType = await categoryService.findById(body.serviceType);

    if (!checkServiceType) throw new BadRequestError("Service type not found!");
  }

  //construct certificate request update object
  for (const key in body) {
    certificateRequest[key] = body[key];
  }

  await certificateService.save(certificateRequest, null);

  CustomResponse(
    res,
    true,
    StatusCodes.OK,
    "Certificate request updated successfully!",
    null
  );
};
export {
  RequestCertificates,
  GetAllCertificates,
  ApproveRejectRequest,
  DeleteRequest,
  GetOneCertificate,
  UpdateRequest,
};
