"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = __importDefault(require("../constant"));
const CategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
    },
    categoryType: {
        type: String,
        required: [true, "Category type is required"],
        enum: {
            values: [constant_1.default.CATEGORYTYPES.NEWS, constant_1.default.CATEGORYTYPES.JOB, constant_1.default.CATEGORYTYPES.CERTIFICATE, constant_1.default.CATEGORYTYPES.SERVICETYPE],
            message: "Valid category type required",
        },
    },
    status: {
        type: Number,
        default: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("Category", CategorySchema);
