"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organization_controller_1 = require("./organization.controller");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const constant_1 = __importDefault(require("../constant"));
const OrganizationRouter = (0, express_1.Router)();
OrganizationRouter.get("/getAll", organization_controller_1.GetAllOrganizations);
OrganizationRouter.get("/getOrg/:id", organization_controller_1.GetOrganizationById);
OrganizationRouter.get("/getUserOrg", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), organization_controller_1.GetLoggedInUserOrganization);
exports.default = OrganizationRouter;
