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
const http_status_codes_1 = require("http-status-codes");
const InternalServerError_1 = __importDefault(require("./error.classes/InternalServerError"));
const response_1 = __importDefault(require("../util/response"));
const errorHandlerMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong!",
        data: {},
    };
    if (err instanceof InternalServerError_1.default ||
        customError.statusCode === http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) {
        customError.message = "Something went wrong!";
    }
    if (err.name === "ValidationError") {
        let validatorKeyValuePairs = {};
        Object.values(err.errors).forEach((error) => {
            validatorKeyValuePairs[error.properties.path] = error.properties.message;
        });
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        customError.message = "Validation Error";
        customError.data = validatorKeyValuePairs;
    }
    if (err.code && err.code === 11000) {
        customError.message = `${Object.keys(err.keyValue)} already exists! Please choose another value.`;
        customError.statusCode = http_status_codes_1.StatusCodes.CONFLICT;
    }
    // handle mongo db cast errors
    if (err.name === "CastError") {
        customError.message = `No item found with ID "${err.value}"!`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    return (0, response_1.default)(res, false, customError.statusCode, customError.message, customError.data);
});
exports.default = errorHandlerMiddleware;
