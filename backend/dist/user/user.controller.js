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
exports.GetUserProfile = exports.RegisterUser = void 0;
const user_util_1 = __importDefault(require("./user.util"));
const user_service_1 = __importDefault(require("./user.service"));
const organization_service_1 = __importDefault(require("../organization/organization.service"));
const user_model_1 = __importDefault(require("./user.model"));
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const organization_model_1 = __importDefault(require("../organization/organization.model"));
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const response_1 = __importDefault(require("../util/response"));
// Import custom errors
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
const BadRequestError_1 = __importDefault(require("../error/error.classes/BadRequestError"));
const constant_1 = __importDefault(require("../constant"));
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = new user_model_1.default(body.user);
    console.log(user.email);
    //check if user already exists
    const existingUser = yield user_service_1.default.findByEmail(user.email);
    if (existingUser) {
        throw new BadRequestError_1.default("User already exists!");
    }
    let organization = null;
    if (body.user.role == constant_1.default.USER.ROLES.ADMIN) {
        organization = new organization_model_1.default(body.organization);
        user.organization = organization._id;
    }
    //construct auth object
    const auth = new auth_model_1.default();
    auth._id = user.email;
    auth.password = yield user_util_1.default.hashPassword(body.user.password);
    auth.user = user._id;
    let createdUser = null;
    //start mongoose session
    const session = yield (0, mongoose_1.startSession)();
    try {
        //start transaction in session
        session.startTransaction();
        //save organization
        if (organization) {
            yield organization_service_1.default.save(organization, session);
        }
        //save user
        createdUser = yield user_service_1.default.save(user, session);
        //save auth
        yield user_service_1.default.save(auth, session);
        //commit transaction
        yield session.commitTransaction();
    }
    catch (e) {
        //abort transaction
        yield session.abortTransaction();
        throw e;
    }
    finally {
        //end session
        session.endSession();
    }
    return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "User registered successfully!", createdUser);
});
exports.RegisterUser = RegisterUser;
const GetUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.auth;
    const user = yield user_service_1.default.findById(auth._id);
    if (!user) {
        throw new NotFoundError_1.default("User not found!");
    }
    return (0, response_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Profile fetched successfully!", user);
});
exports.GetUserProfile = GetUserProfile;
