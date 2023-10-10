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
exports.disableExpiredAppointments = exports.timeSlots = void 0;
const constant_1 = __importDefault(require("../constant"));
const appointment_service_1 = __importDefault(require("./appointment.service"));
const timeSlots = [
    {
        id: 1,
        timeSlot: "9:00 AM - 09:30 AM",
    },
    {
        id: 2,
        timeSlot: "09:30 AM - 10:00 AM",
    },
    {
        id: 3,
        timeSlot: "10:00 AM - 10:30 AM",
    },
    {
        id: 4,
        timeSlot: "10:30 AM - 11:00 AM",
    },
    {
        id: 5,
        timeSlot: "11:00 AM - 11:30 AM",
    },
    {
        id: 6,
        timeSlot: "11:30 AM - 12:00 PM",
    },
    {
        id: 7,
        timeSlot: "12:00 PM - 12:30 PM",
    },
    {
        id: 8,
        timeSlot: "12:30 PM - 1:00 PM",
    },
    {
        id: 9,
        timeSlot: "01:00 PM - 1:30 PM",
    },
    {
        id: 10,
        timeSlot: "01:30 PM - 2:00 PM",
    },
    {
        id: 11,
        timeSlot: "03:00 PM - 3:30 PM",
    },
    {
        id: 12,
        timeSlot: "03:30 PM - 4:00 PM",
    },
    {
        id: 13,
        timeSlot: "04:00 PM - 4:30 PM",
    },
    {
        id: 14,
        timeSlot: "04:30 PM - 5:00 PM",
    },
];
exports.timeSlots = timeSlots;
const disableExpiredAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    let appointments = yield appointment_service_1.default.findExpiredAppointments();
    appointments.forEach((appointment) => __awaiter(void 0, void 0, void 0, function* () {
        appointment.status = constant_1.default.WELLKNOWNSTATUS.DISABLED;
        yield appointment.save();
    }));
});
exports.disableExpiredAppointments = disableExpiredAppointments;
