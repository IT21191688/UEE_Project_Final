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
exports.UpdateRequest = exports.GetOneCertificate = exports.DeleteRequest = exports.ApproveRejectRequest = exports.GetAllCertificates = exports.RequestCertificates = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const certificate_model_1 = __importDefault(require("./certificate.model"));
const category_service_1 = __importDefault(require("../category/category.service"));
const BadRequestError_1 = __importDefault(require("../error/error.classes/BadRequestError"));
const certificate_service_1 = __importDefault(require("./certificate.service"));
const response_1 = __importDefault(require("../util/response"));
const constant_1 = __importDefault(require("../constant"));
const RequestCertificates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const auth = req.auth;
    const certificateType = yield category_service_1.default.findById(body.certificate);
    if (!certificateType)
        throw new BadRequestError_1.default("Certificate type not found!");
    const serviceType = yield category_service_1.default.findById(body.serviceType);
    if (!serviceType)
        throw new BadRequestError_1.default("Service type not found!");
    const newCertificateReq = new certificate_model_1.default(body);
    newCertificateReq.addedBy = auth._id;
    let createdRequest = null;
    const session = yield (0, mongoose_1.startSession)(); //start mongoose session
    try {
        session.startTransaction(); //start transaction in session
        //save certificate request
        createdRequest = yield certificate_service_1.default.save(newCertificateReq, session);
        yield session.commitTransaction();
    }
    catch (e) {
        yield session.abortTransaction();
        throw e;
    }
    finally {
        session.endSession();
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Certificate request created successfully!", createdRequest);
});
exports.RequestCertificates = RequestCertificates;
const GetAllCertificates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    let allRequests = null;
    if (auth.role === constant_1.default.USER.ROLES.ADMIN) {
        allRequests = yield certificate_service_1.default.findAllApproveAndPending();
    }
    else {
        allRequests = yield certificate_service_1.default.findAllApprovePendingAndRejectByUser(auth._id);
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "", allRequests);
});
exports.GetAllCertificates = GetAllCertificates;
const ApproveRejectRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const certificateId = req.params.certificateId;
    const status = req.query.status;
    const requestCheck = yield certificate_service_1.default.findById(certificateId);
    if (!requestCheck)
        throw new BadRequestError_1.default("Certificate request not found!");
    if (requestCheck.status !== constant_1.default.WELLKNOWNSTATUS.PENDING)
        throw new BadRequestError_1.default("Certificate request is already approved or rejected!");
    let resData = null;
    switch (Number(status)) {
        case 3:
            requestCheck.status = constant_1.default.WELLKNOWNSTATUS.APPROVE;
            resData = "Certificate request approved successfully!";
            break;
        case 4:
            requestCheck.status = constant_1.default.WELLKNOWNSTATUS.REJECT;
            resData = "Certificate request rejected successfully!";
            break;
        default:
            throw new BadRequestError_1.default("Invalid status!");
    }
    yield certificate_service_1.default.save(requestCheck, null);
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, resData, null);
});
exports.ApproveRejectRequest = ApproveRejectRequest;
const DeleteRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const certificateId = req.params.certificateId;
    const requestCheck = yield certificate_service_1.default.findById(certificateId);
    if (!requestCheck)
        throw new BadRequestError_1.default("Certificate request not found!");
    if (((_a = requestCheck.addedBy) === null || _a === void 0 ? void 0 : _a.toString()) !== req.auth._id.toString())
        throw new BadRequestError_1.default("You are not authorized to delete this request!");
    requestCheck.status = constant_1.default.WELLKNOWNSTATUS.DELETED;
    yield certificate_service_1.default.save(requestCheck, null);
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Certificate request deleted successfully!", null);
});
exports.DeleteRequest = DeleteRequest;
const GetOneCertificate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const certificateId = req.params.certificateId;
    const certificate = yield certificate_service_1.default.findById(certificateId);
    if (!certificate)
        throw new BadRequestError_1.default("Certificate request not found!");
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "", certificate);
});
exports.GetOneCertificate = GetOneCertificate;
const UpdateRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const certificateId = req.params.certificateId;
    const body = req.body;
    const auth = req.auth;
    const certificateRequest = yield certificate_service_1.default.findById(certificateId);
    if (!certificateRequest)
        throw new BadRequestError_1.default("Certificate request not found!");
    if (((_b = certificateRequest.addedBy) === null || _b === void 0 ? void 0 : _b.toString()) !== auth._id.toString())
        throw new BadRequestError_1.default("You are not authorized to update this request!");
    if (certificateRequest.status !== constant_1.default.WELLKNOWNSTATUS.PENDING)
        throw new BadRequestError_1.default("Certificate request is already approved or rejected!");
    if (body.certificate) {
        const checkCertificate = yield category_service_1.default.findById(body.certificate);
        if (!checkCertificate)
            throw new BadRequestError_1.default("Certificate type not found!");
    }
    if (body.serviceType) {
        const checkServiceType = yield category_service_1.default.findById(body.serviceType);
        if (!checkServiceType)
            throw new BadRequestError_1.default("Service type not found!");
    }
    //construct certificate request update object
    for (const key in body) {
        certificateRequest[key] = body[key];
    }
    yield certificate_service_1.default.save(certificateRequest, null);
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Certificate request updated successfully!", null);
});
exports.UpdateRequest = UpdateRequest;
