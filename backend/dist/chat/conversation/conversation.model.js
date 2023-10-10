"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = __importDefault(require("../../constant"));
const ConverSationSchema = new mongoose_1.default.Schema({
    memberOne: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "MemberOne is required"],
    },
    memberTwo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "MemberTwo is required"],
    },
    organization: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, "Organization is required"],
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Number,
        default: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("Conversation", ConverSationSchema);
