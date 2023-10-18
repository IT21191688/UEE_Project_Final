"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controller_1 = require("./news.controller");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const constant_1 = __importDefault(require("../constant"));
const NewsRouter = (0, express_1.Router)();
NewsRouter.post("/create", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), 
// commonMiddleware.multerUploader.single("newsImage"),
news_controller_1.CreateNews);
NewsRouter.get("/getAllActiveNews", auth_middleware_1.default.authorize([
    constant_1.default.USER.ROLES.ADMIN,
    constant_1.default.USER.ROLES.USER,
]), news_controller_1.GetAllActiveNews);
NewsRouter.put("/deleteNews/:id", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), news_controller_1.DeleteNews);
NewsRouter.patch("/updateNews/:id", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), 
//commonMiddleware.multerUploader.single("newsImage"),
news_controller_1.UpdateNews);
NewsRouter.get("/getOneNews/:newsId", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), news_controller_1.GetNewsDetails);
exports.default = NewsRouter;
