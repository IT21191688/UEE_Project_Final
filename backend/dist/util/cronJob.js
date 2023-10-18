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
exports.sendAppointmentReminders = exports.cronJob = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const appointment_service_1 = __importDefault(require("../appointment/appointment.service"));
const email_templates_1 = __importDefault(require("./email-templates/email.templates"));
const user_service_1 = __importDefault(require("../user/user.service"));
const emailServer_1 = require("./emailServer");
const appointment_util_1 = require("../appointment/appointment.util");
//cron job helper fun
const cronJob = (cronTime, callback) => {
    node_schedule_1.default.scheduleJob(cronTime, callback);
};
exports.cronJob = cronJob;
// */30 * * * * * => every 30 seconds
// 0 6 * * * => every day at 6 am
//send appointment reminders daily at 6 am
const sendAppointmentReminders = () => {
    (0, exports.cronJob)("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Appointment reminder cron job running...");
        //get today's date
        const today = new Date();
        //get all appointments for today
        const appointments = yield appointment_service_1.default.findByDateAndApproved(new Date(today.toISOString().split("T")[0]));
        appointments.forEach((appointment) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            let user = yield user_service_1.default.findById(appointment.addedBy);
            let data = {
                userName: user.fullName,
                appointmentDate: appointment.appointmentDate,
                appointmentTime: (_a = appointment_util_1.timeSlots.find((time) => {
                    return time.id === appointment.appointmentTime;
                })) === null || _a === void 0 ? void 0 : _a.timeSlot,
            };
            let htmlBody = email_templates_1.default.AppointmentReminderTemplate(data);
            yield (0, emailServer_1.sendEmail)(user.email, "Appointment Reminder", htmlBody, null);
        }));
    }));
};
exports.sendAppointmentReminders = sendAppointmentReminders;
