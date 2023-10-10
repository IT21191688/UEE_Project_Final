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
exports.GetAllConversations = exports.CreateConversation = void 0;
const mongoose_1 = require("mongoose");
const http_status_codes_1 = require("http-status-codes");
const conversation_model_1 = __importDefault(require("./conversation.model"));
const conversation_service_1 = __importDefault(require("./conversation.service"));
const user_service_1 = __importDefault(require("../../user/user.service"));
const response_1 = __importDefault(require("../../util/response"));
const NotFoundError_1 = __importDefault(require("../../error/error.classes/NotFoundError"));
const organization_service_1 = __importDefault(require("../../organization/organization.service"));
const ConflictError_1 = __importDefault(require("../../error/error.classes/ConflictError"));
const CreateConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    const body = req.body;
    const organization = yield organization_service_1.default.findById(body.organization);
    if (!organization)
        throw new NotFoundError_1.default("Organization not found!");
    const memberTwo = yield user_service_1.default.findByOrganization(body.organization);
    if (!memberTwo)
        throw new NotFoundError_1.default("Member not found!");
    const conversationExists = yield conversation_service_1.default.findByMembers(auth._id, memberTwo._id);
    if (conversationExists)
        throw new ConflictError_1.default("Conversation already exists!");
    //construct conversation object
    const newConversation = new conversation_model_1.default({
        memberOne: auth._id,
        memberTwo: memberTwo._id,
        organization: organization._id,
    });
    const session = yield (0, mongoose_1.startSession)(); //start mongoose session
    let createdConversation = null;
    try {
        session.startTransaction(); //start transaction in session
        createdConversation = yield conversation_service_1.default.save(newConversation, session); //save conversation
        yield session.commitTransaction();
    }
    catch (e) {
        yield session.abortTransaction();
        throw e;
    }
    finally {
        session.endSession();
    }
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Conversation created successfully!", createdConversation);
});
exports.CreateConversation = CreateConversation;
const GetAllConversations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    const conversations = yield conversation_service_1.default.findConversationsByMember(auth._id);
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Conversations fetched successfully!", conversations);
});
exports.GetAllConversations = GetAllConversations;
