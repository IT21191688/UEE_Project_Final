"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = __importDefault(require("../constant"));
const JobSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Job title is required!"],
    },
    type: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
    avgAnnualSalary: {
        type: Number,
        required: [true, "Job average annual salary is required!"],
    },
    description: {
        type: String,
        required: [true, "Job description is required!"],
    },
    addedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    organization: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Organization",
    },
    status: {
        type: Number,
        default: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("Job", JobSchema);
