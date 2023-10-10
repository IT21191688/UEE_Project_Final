import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";

import {
  RequestCertificates,
  GetAllCertificates,
  ApproveRejectRequest,
  DeleteRequest,
  GetOneCertificate,
  UpdateRequest,
} from "./certificate.controller";

const CertificateRouter = Router();

CertificateRouter.post(
  "/request",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  RequestCertificates
);

CertificateRouter.get(
  "/getAll",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetAllCertificates
);

CertificateRouter.put(
  "/approveReject/:certificateId",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  ApproveRejectRequest
);

CertificateRouter.put(
  "/delete/:certificateId",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  DeleteRequest
);

CertificateRouter.get(
  "/getById/:certificateId",
  authMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetOneCertificate
);

CertificateRouter.patch(
  "/update/:certificateId",
  authMiddleware.authorize([constants.USER.ROLES.USER]),
  UpdateRequest
);

export default CertificateRouter;
