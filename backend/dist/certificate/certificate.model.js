"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = __importDefault(require("../constant"));
const CertificateSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required!"],
    },
    nic: {
        type: String,
        required: [true, "NIC is required!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        validate: {
            validator: (value) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email`,
        },
    },
    address: {
        type: String,
        required: [true, "Address is required!"],
    },
    contactNumber: {
        type: String,
        required: [true, "Contact number is required!"],
    },
    certificate: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
    serviceType: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
    additionalDocuments: {
        type: [String],
    },
    addedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: Number,
        default: constant_1.default.WELLKNOWNSTATUS.PENDING,
    },
});
exports.default = mongoose_1.default.model("Certificate", CertificateSchema);
