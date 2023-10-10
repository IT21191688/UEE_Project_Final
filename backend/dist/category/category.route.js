"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../auth/auth.middleware"));
const constant_1 = __importDefault(require("../constant"));
const category_controller_1 = require("./category.controller");
const CategoryRouter = (0, express_1.Router)();
CategoryRouter.post("/create", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), category_controller_1.CreateCategory);
//get All Categories related to specific type
CategoryRouter.get("/getAllCategories", category_controller_1.GetAllCategories);
CategoryRouter.put("/deleteCategory/:id", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), category_controller_1.DeleteCategory);
CategoryRouter.patch("/updateCategory/:id", auth_middleware_1.default.authorize([constant_1.default.USER.ROLES.ADMIN]), category_controller_1.UpdateCategory);
exports.default = CategoryRouter;
