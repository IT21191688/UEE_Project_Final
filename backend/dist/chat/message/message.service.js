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
const message_model_1 = __importDefault(require("./message.model"));
const save = (data, session) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data.save({
        session,
    });
});
const getAllMessagesByConversation = (conversation) => __awaiter(void 0, void 0, void 0, function* () {
    return yield message_model_1.default.find({
        conversation: conversation,
        status: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    })
        .populate("sender", "fullName")
        .sort({ createdAt: 1 });
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield message_model_1.default.findOne({
        _id: id,
        status: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
    });
});
exports.default = {
    save,
    getAllMessagesByConversation,
    findById,
};
