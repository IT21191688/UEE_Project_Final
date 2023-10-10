"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversation_controller_1 = require("./conversation.controller");
const auth_middleware_1 = __importDefault(require("../../auth/auth.middleware"));
const constant_1 = __importDefault(require("../../constant"));
const ConversationRouter = (0, express_1.Router)();
ConversationRouter.post("/create", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.USER]), conversation_controller_1.CreateConversation);
ConversationRouter.get("/all-conversations", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.USER,
    constant_1.default.USER.ROLES.ADMIN,
]), conversation_controller_1.GetAllConversations);
exports.default = ConversationRouter;
