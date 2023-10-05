import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import constants from "../constant";

import { RequestCertificates } from "./certificate.controller";

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
  ])
);

export default CertificateRouter;
