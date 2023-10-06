"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = __importDefault(require("../constant"));
const UserSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        maxlength: [100, "Full name cannot be more than 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        maxlength: [100, "Email cannot be more than 100 characters"],
        validate: {
            validator: (value) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email`,
        },
    },
    profileImage: {
        type: Object,
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: {
            values: [constant_1.default.USER.ROLES.ADMIN, constant_1.default.USER.ROLES.USER],
            message: "Valid roles required",
        },
    },
    organization: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Organization",
    },
    savedJobs: {
        type: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Job",
            },
        ],
    },
    appliedJobs: {
        type: [
            {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Job",
            },
        ],
    },
    status: {
        type: Number,
        default: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("User", UserSchema);
