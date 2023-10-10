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
const job_model_1 = __importDefault(require("./job.model"));
const constant_1 = __importDefault(require("../constant"));
const save = (job, session) => __awaiter(void 0, void 0, void 0, function* () {
    if (session) {
        return yield job.save({ session });
    }
    else {
        return yield job.save();
    }
});
const findAllJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield job_model_1.default.find({
        status: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    })
        .populate("organization")
        .populate("type", "-createdAt -updatedAt -status")
        .sort({ createdAt: -1 });
});
const findAllJobsByAddedBy = (addedBy) => __awaiter(void 0, void 0, void 0, function* () {
    return yield job_model_1.default.find({
        addedBy: addedBy,
        status: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    })
        .populate("organization", "-createdAt -updatedAt -status")
        .populate("type", "-createdAt -updatedAt -status")
        .sort({ createdAt: -1 });
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return job_model_1.default.findOne({
        _id: id,
        status: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    }).populate("organization");
});
exports.default = { save, findAllJobs, findAllJobsByAddedBy, findById };
