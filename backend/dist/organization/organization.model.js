"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = __importDefault(require("../constant"));
const OrganizationSchema = new mongoose_1.default.Schema({
    orgName: {
        type: String,
        required: [true, "Organization name is required"],
    },
    orgEmail: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: (value) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email`,
        },
    },
    orgAddress: {
        type: String,
        required: [true, "Address is required"],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
    orgImage: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: Number,
        default: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("Organization", OrganizationSchema);
