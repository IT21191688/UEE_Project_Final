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
const constant_1 = __importDefault(require("../../constant"));
const conversation_model_1 = __importDefault(require("./conversation.model"));
const save = (data, session) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data.save({ session });
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield conversation_model_1.default.findOne({
        _id: id,
        status: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    });
});
const findByMembers = (memberOne, memberTwo) => __awaiter(void 0, void 0, void 0, function* () {
    return yield conversation_model_1.default.findOne({
        $or: [
            { memberOne, memberTwo },
            { memberOne: memberTwo, memberTwo: memberOne },
        ],
        status: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    });
});
const findConversationsByMember = (member) => __awaiter(void 0, void 0, void 0, function* () {
    return yield conversation_model_1.default.find({
        $or: [{ memberOne: member }, { memberTwo: member }],
        status: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    })
        .populate("memberOne", "fullName email")
        .populate("memberTwo", "fullName email")
        .populate("organization", "orgName orgEmail orgImage")
        .sort({ lastUpdated: -1 });
});
exports.default = {
    save,
    findById,
    findByMembers,
    findConversationsByMember,
};
