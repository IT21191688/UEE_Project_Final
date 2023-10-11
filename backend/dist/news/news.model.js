"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = __importDefault(require("../constant"));
const NewsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    newsImage: {
        type: String,
    },
    addedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: Number,
        default: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = mongoose_1.default.model("New", NewsSchema);
