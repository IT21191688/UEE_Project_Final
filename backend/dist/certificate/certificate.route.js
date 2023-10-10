"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const constant_1 = __importDefault(require("../constant"));
const certificate_controller_1 = require("./certificate.controller");
const CertificateRouter = (0, express_1.Router)();
CertificateRouter.post("/request", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), certificate_controller_1.RequestCertificates);
CertificateRouter.get("/getAll", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), certificate_controller_1.GetAllCertificates);
CertificateRouter.put("/approveReject/:certificateId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), certificate_controller_1.ApproveRejectRequest);
CertificateRouter.put("/delete/:certificateId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), certificate_controller_1.DeleteRequest);
CertificateRouter.get("/getById/:certificateId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), certificate_controller_1.GetOneCertificate);
CertificateRouter.patch("/update/:certificateId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), certificate_controller_1.UpdateRequest);
exports.default = CertificateRouter;
