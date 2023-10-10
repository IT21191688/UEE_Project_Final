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
const constant_1 = __importDefault(require("../constant"));
const appointment_model_1 = __importDefault(require("./appointment.model"));
const save = (appointment, session) => __awaiter(void 0, void 0, void 0, function* () {
    if (session) {
        return yield appointment.save({ session });
    }
    else {
        return yield appointment.save();
    }
});
const findAllByOrgAndDateAndTimeSlot = (organizationId, date, timeSlot) => __awaiter(void 0, void 0, void 0, function* () {
    return yield appointment_model_1.default.find({
        organization: organizationId,
        appointmentDate: date,
        appointmentTime: timeSlot,
        status: {
            $in: [
                constant_1.default.WELLKNOWNSTATUS.PENDING,
                constant_1.default.WELLKNOWNSTATUS.APPROVE,
            ],
        },
    });
});
const findAllAppointments = () => {
    return appointment_model_1.default.find({
        status: {
            $in: [
                constant_1.default.WELLKNOWNSTATUS.PENDING,
                constant_1.default.WELLKNOWNSTATUS.APPROVE,
                constant_1.default.WELLKNOWNSTATUS.DISABLED,
            ],
        },
    })
        .populate("addedBy", "-createdAt -updatedAt -status")
        .populate("organization", "-createdAt -updatedAt -status");
};
const findAllByOrgAndDate = (organization, date) => {
    return appointment_model_1.default.find({
        organization,
        appointmentDate: date,
        status: {
            $in: [
                constant_1.default.WELLKNOWNSTATUS.PENDING,
                constant_1.default.WELLKNOWNSTATUS.APPROVE,
            ],
        },
    });
};
const findAllByAddedBy = (addedBy) => {
    return appointment_model_1.default.find({
        addedBy,
        status: {
            $in: [
                constant_1.default.WELLKNOWNSTATUS.PENDING,
                constant_1.default.WELLKNOWNSTATUS.APPROVE,
                constant_1.default.WELLKNOWNSTATUS.DISABLED,
            ],
        },
    }).populate("organization", "-createdAt -updatedAt -status");
};
const findAllByOrg = (organization) => {
    return appointment_model_1.default.find({
        organization,
        status: {
            $in: [
                constant_1.default.WELLKNOWNSTATUS.PENDING,
                constant_1.default.WELLKNOWNSTATUS.APPROVE,
                constant_1.default.WELLKNOWNSTATUS.DISABLED,
            ],
        },
    })
        .populate("addedBy", "-createdAt -updatedAt -status")
        .populate("organization", "-createdAt -updatedAt -status");
};
const findById = (id) => {
    return appointment_model_1.default.findOne({
        _id: id,
        status: {
            $in: [
                constant_1.default.WELLKNOWNSTATUS.PENDING,
                constant_1.default.WELLKNOWNSTATUS.APPROVE,
                constant_1.default.WELLKNOWNSTATUS.DISABLED,
            ],
        },
    });
};
const findByDateAndApproved = (date) => {
    return appointment_model_1.default.find({
        appointmentDate: date,
        status: constant_1.default.WELLKNOWNSTATUS.APPROVE,
    });
};
const findExpiredAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    return yield appointment_model_1.default.find({
        appointmentDate: { $lt: today },
        status: constant_1.default.WELLKNOWNSTATUS.PENDING,
    });
});
exports.default = {
    save,
    findAllByOrgAndDateAndTimeSlot,
    findAllByOrgAndDate,
    findAllByAddedBy,
    findAllByOrg,
    findById,
    findByDateAndApproved,
    findExpiredAppointments,
    findAllAppointments
};
