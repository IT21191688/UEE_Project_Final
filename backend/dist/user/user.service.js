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
const user_model_1 = __importDefault(require("./user.model"));
const save = (user, session) => __awaiter(void 0, void 0, void 0, function* () {
    if (session) {
        return yield user.save({ session });
    }
    else {
        return yield user.save();
    }
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ email: email });
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findById(id).populate("organization");
});
const findByOrganization = (organization) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ organization: organization });
});
const findAllAppliedJobs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findById(id)
        .populate({
        path: "appliedJobs",
        populate: {
            path: "organization",
            select: "-createdAt -updatedAt -status",
        },
    })
        .populate({
        path: "appliedJobs",
        populate: {
            path: "type",
            select: "-createdAt -updatedAt -status",
        },
    });
});
//find all saved jobs
const findAllSavedJobs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findById(id)
        .populate({
        path: "savedJobs",
        populate: {
            path: "organization",
            select: "-createdAt -updatedAt -status",
        },
    })
        .populate({
        path: "savedJobs",
        populate: {
            path: "type",
            select: "-createdAt -updatedAt -status",
        },
    });
});
exports.default = {
    save,
    findByEmail,
    findById,
    findByOrganization,
    findAllAppliedJobs,
    findAllSavedJobs,
};
