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
exports.GetLoggedInUserOrganization = exports.GetOrganizationById = exports.GetAllOrganizations = void 0;
const organization_service_1 = __importDefault(require("./organization.service"));
const http_status_codes_1 = require("http-status-codes");
const response_1 = __importDefault(require("../util/response"));
const user_service_1 = __importDefault(require("../user/user.service"));
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const GetAllOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const organizations = yield organization_service_1.default.findAll();
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Organizations fetched successfully!", organizations);
});
exports.GetAllOrganizations = GetAllOrganizations;
//
const GetOrganizationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const organization = yield organization_service_1.default.findById(id);
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Organization fetched successfully!", organization);
});
exports.GetOrganizationById = GetOrganizationById;
const GetLoggedInUserOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    const user = yield user_service_1.default.findById(auth._id);
    const organization = yield organization_service_1.default.findById(user.organization);
    if (!organization)
        throw new NotFoundError_1.default("Organization not found!");
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Organization fetched successfully!", organization);
});
exports.GetLoggedInUserOrganization = GetLoggedInUserOrganization;
