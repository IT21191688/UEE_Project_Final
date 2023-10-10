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
const constant_1 = __importDefault(require("../constant"));
const certificate_model_1 = __importDefault(require("./certificate.model"));
const save = (certificate, session) => __awaiter(void 0, void 0, void 0, function* () {
    if (session) {
        return yield certificate.save({ session });
    }
    else {
        return yield certificate.save();
    }
});
const findAllApproveAndPending = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield certificate_model_1.default.find({
        status: {
            $in: [
                constant_1.default.WELLKNOWNSTATUS.APPROVE,
                constant_1.default.WELLKNOWNSTATUS.PENDING,
            ],
        },
    }).populate("certificate serviceType");
});
const findAllApprovePendingAndRejectByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield certificate_model_1.default.find({
        status: {
            $in: [
                constant_1.default.WELLKNOWNSTATUS.APPROVE,
                constant_1.default.WELLKNOWNSTATUS.PENDING,
                constant_1.default.WELLKNOWNSTATUS.REJECT,
            ],
        },
        addedBy: userId,
    }).populate("certificate serviceType");
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield certificate_model_1.default.findOne({
        _id: id,
        status: {
            $in: [
                constant_1.default.WELLKNOWNSTATUS.APPROVE,
                constant_1.default.WELLKNOWNSTATUS.PENDING,
                constant_1.default.WELLKNOWNSTATUS.REJECT,
            ],
        },
    });
});
exports.default = {
    save,
    findAllApproveAndPending,
    findAllApprovePendingAndRejectByUser,
    findById,
};
