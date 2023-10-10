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
exports.UpdateCategory = exports.DeleteCategory = exports.GetAllCategories = exports.CreateCategory = void 0;
const http_status_codes_1 = require("http-status-codes");
const category_service_1 = __importDefault(require("./category.service"));
const category_model_1 = __importDefault(require("./category.model"));
const response_1 = __importDefault(require("../util/response"));
const constant_1 = __importDefault(require("../constant"));
const BadRequestError_1 = __importDefault(require("../error/error.classes/BadRequestError"));
const CreateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    let types = Object.values(constant_1.default.CATEGORYTYPES);
    if (!types.includes(body.categoryType))
        throw new BadRequestError_1.default("Invalid category type!");
    const newCategory = new category_model_1.default(body);
    let createdCategory = null;
    try {
        createdCategory = yield category_service_1.default.save(newCategory, null); //save category
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Category created successfully!", createdCategory);
    }
    catch (e) {
        throw e;
    }
});
exports.CreateCategory = CreateCategory;
const GetAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let type = req.query.type;
    //validate category types
    let types = Object.values(constant_1.default.CATEGORYTYPES);
    if (!types.includes(type))
        throw new BadRequestError_1.default("Invalid category type!");
    let categories = yield category_service_1.default.findAllByType(type);
    (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Categories fetched successfully!", categories);
});
exports.GetAllCategories = GetAllCategories;
const DeleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let categoryId = req.params.id;
    const category = yield category_service_1.default.findById(categoryId);
    if (!category)
        throw new BadRequestError_1.default("Category not found!");
    category.status = constant_1.default.WELLKNOWNSTATUS.DELETED;
    try {
        yield category_service_1.default.save(category, null); //save category
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Category deleted successfully!", {});
    }
    catch (e) {
        throw e;
    }
});
exports.DeleteCategory = DeleteCategory;
const UpdateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let categoryId = req.params.id;
    let body = req.body;
    const category = yield category_service_1.default.findById(categoryId);
    if (!category)
        throw new BadRequestError_1.default("Category not found!");
    //construct updated category
    for (let key in body) {
        if (key == "categoryType") {
            let types = Object.values(constant_1.default.CATEGORYTYPES);
            if (!types.includes(body[key]))
                throw new BadRequestError_1.default("Invalid category type!");
        }
        category[key] = body[key];
    }
    try {
        yield category_service_1.default.save(category, null); //save category
        (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Category updated successfully!", category);
    }
    catch (e) {
        throw e;
    }
});
exports.UpdateCategory = UpdateCategory;
