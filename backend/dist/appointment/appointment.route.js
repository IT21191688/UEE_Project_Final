"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const constant_1 = __importDefault(require("../constant"));
const appointment_controller_1 = require("./appointment.controller");
const AppointmentRouter = (0, express_1.Router)();
AppointmentRouter.post("/create", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), appointment_controller_1.CreateAppointment);
AppointmentRouter.get("/getAvailableSlots", appointment_controller_1.GetAvailableSlots);
AppointmentRouter.get("/getAppointments", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.USER,
    constant_1.default.USER.ROLES.ADMIN,
]), appointment_controller_1.GetAllAppointments);
AppointmentRouter.get("/getAllAppointments", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.USER,
    constant_1.default.USER.ROLES.ADMIN,
]), appointment_controller_1.GetAllAppointmentsAdmin);
AppointmentRouter.put("/approveReject/:appointmentId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), appointment_controller_1.ApproveOrRejectAppointment);
AppointmentRouter.get("/getAppoinmentDetails/:appointmentId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), appointment_controller_1.GetAppointmentDetails);
AppointmentRouter.get("/getAppointmentDetailsAdmin/:appointmentId", // Change the route path as needed
auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), appointment_controller_1.GetAppointmentDetailsAdmin);
AppointmentRouter.patch("/update/:appointmentId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), appointment_controller_1.UpdateAppointment);
AppointmentRouter.patch("/delete/:appointmentId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), appointment_controller_1.DeleteAppointment);
exports.default = AppointmentRouter;
