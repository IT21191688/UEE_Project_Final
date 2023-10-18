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
const news_model_1 = __importDefault(require("./news.model"));
const save = (news, session) => __awaiter(void 0, void 0, void 0, function* () {
    if (session) {
        return yield news.save({ session });
    }
    else {
        return yield news.save();
    }
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield news_model_1.default.findById(id).populate("addedBy");
});
//get all news status active and sort by createdAt desc order and populate addedBy field in addedBy object contains user details from user details get organization details and category details
const findAllActiveNews = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield news_model_1.default.find({ status: constant_1.default.WELLKNOWNSTATUS.ACTIVE })
        .sort({ createdAt: -1 })
        .populate("category")
        .populate({
        path: "addedBy",
        populate: {
            path: "organization",
        },
    });
});
//gell active related to added by user
const findAllActiveNewsByAddedUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield news_model_1.default.find({
        status: constant_1.default.WELLKNOWNSTATUS.ACTIVE,
        addedBy: userId,
    })
        .sort({ createdAt: -1 })
        .populate("category")
        .populate({
        path: "addedBy",
        populate: {
            path: "organization",
        },
    });
});
const findDetailsById = (id) => {
    return news_model_1.default.findOne({
        _id: id,
    });
};
exports.default = {
    save,
    findById,
    findAllActiveNews,
    findAllActiveNewsByAddedUser,
    findDetailsById
};
