"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appointment_route_1 = __importDefault(require("./appointment/appointment.route"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const category_route_1 = __importDefault(require("./category/category.route"));
const certificate_route_1 = __importDefault(require("./certificate/certificate.route"));
const conversation_route_1 = __importDefault(require("./chat/conversation/conversation.route"));
const message_route_1 = __importDefault(require("./chat/message/message.route"));
const constant_1 = __importDefault(require("./constant"));
const job_route_1 = __importDefault(require("./job/job.route"));
const news_route_1 = __importDefault(require("./news/news.route"));
const organization_route_1 = __importDefault(require("./organization/organization.route"));
const user_route_1 = __importDefault(require("./user/user.route"));
const requestMappings = (app) => {
    app.use(constant_1.default.API.PREFIX.concat("/user"), user_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/auth"), auth_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/organization"), organization_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/appointment"), appointment_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/news"), news_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/category"), category_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/conversation"), conversation_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/message"), message_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/job"), job_route_1.default);
    app.use(constant_1.default.API.PREFIX.concat("/certificate"), certificate_route_1.default);
};
exports.default = requestMappings;
