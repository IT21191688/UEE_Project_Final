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
exports.DeleteMessage = exports.GetAllMessages = exports.SendMessage = void 0;
const mongoose_1 = require("mongoose");
const conversation_service_1 = __importDefault(require("../conversation/conversation.service"));
const message_model_1 = __importDefault(require("./message.model"));
const NotFoundError_1 = __importDefault(require("../../error/error.classes/NotFoundError"));
const message_service_1 = __importDefault(require("./message.service"));
const response_1 = __importDefault(require("../../util/response"));
const http_status_codes_1 = require("http-status-codes");
const constant_1 = __importDefault(require("../../constant"));
const SendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conversationId = req.params.conversationId;
    const auth = req.auth;
    const body = req.body;
    //check if conversation exists
    let conversation = yield conversation_service_1.default.findById(conversationId);
    if (!conversation)
        throw new NotFoundError_1.default("Conversation not found!");
    //construct message object
    const newMessage = new message_model_1.default({
        conversation: conversation._id,
        sender: auth._id,
        message: body.message,
    });
    const session = yield (0, mongoose_1.startSession)(); //start mongoose session
    let createdMessage = null;
    try {
        session.startTransaction(); //start transaction in session
        //update conversation lastUpdated
        conversation.lastUpdated = new Date();
        yield conversation.save({ session });
        createdMessage = yield message_service_1.default.save(newMessage, session); //save message
        yield session.commitTransaction();
    }
    catch (e) {
        yield session.abortTransaction();
        throw e;
    }
    finally {
        session.endSession();
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Message sent successfully!", createdMessage);
});
exports.SendMessage = SendMessage;
const GetAllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conversationId = req.params.conversationId;
    //check if conversation exists
    let conversation = yield conversation_service_1.default.findById(conversationId);
    if (!conversation)
        throw new NotFoundError_1.default("Conversation not found!");
    const messages = yield message_service_1.default.getAllMessagesByConversation(conversationId);
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Messages fetched successfully!", messages);
});
exports.GetAllMessages = GetAllMessages;
const DeleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    const messageId = req.params.messageId;
    const message = yield message_service_1.default.findById(messageId);
    if (!message)
        throw new NotFoundError_1.default("Message not found!");
    if (auth._id != message.sender)
        throw new NotFoundError_1.default("You are not allowed to delete this message!");
    const session = yield (0, mongoose_1.startSession)(); //start mongoose session
    try {
        session.startTransaction(); //start transaction in session
        //update message status
        message.status = constant_1.default.WELLKNOWNSTATUS.DELETED;
        yield message.save({ session });
        yield session.commitTransaction();
    }
    catch (e) {
        yield session.abortTransaction();
        throw e;
    }
    finally {
        session.endSession();
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Message deleted successfully!", {});
});
exports.DeleteMessage = DeleteMessage;
