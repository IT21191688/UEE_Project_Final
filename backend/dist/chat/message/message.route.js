"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../auth/auth.middleware"));
const constant_1 = __importDefault(require("../../constant"));
const message_controller_1 = require("./message.controller");
const MessageRouter = (0, express_1.Router)();
MessageRouter.post("/send/:conversationId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.USER,
    constant_1.default.USER.ROLES.ADMIN,
]), message_controller_1.SendMessage);
MessageRouter.get("/all-messages/:conversationId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.USER,
    constant_1.default.USER.ROLES.ADMIN,
]), message_controller_1.GetAllMessages);
MessageRouter.put("/delete/:messageId", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.USER,
    constant_1.default.USER.ROLES.ADMIN,
]), message_controller_1.DeleteMessage);
exports.default = MessageRouter;
