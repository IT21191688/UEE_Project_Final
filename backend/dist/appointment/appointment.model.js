"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = __importDefault(require("../constant"));
const AppointmentSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
    },
    description: {
        type: String,
        maxlength: [500, "Description cannot be more than 500 characters!"],
    },
    appointmentDate: {
        type: Date,
        required: [true, "Appointment date is required!"],
    },
    appointmentTime: {
        type: Number,
        required: [true, "Appointment time is required!"],
    },
    organization: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Organization",
    },
    addedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: Number,
        default: constant_1.default.WELLKNOWNSTATUS.PENDING,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("Appointment", AppointmentSchema);
