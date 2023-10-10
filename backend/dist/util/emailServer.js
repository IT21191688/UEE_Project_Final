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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NotFoundError_1 = __importDefault(require("../error/error.classes/NotFoundError"));
// Mail server configurations
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_PASSWORD,
    },
});
const sendEmail = (email, subject, htmlBody, attachment) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email)
        throw new NotFoundError_1.default("Email is required!");
    if (!subject)
        throw new NotFoundError_1.default("Subject is required!");
    if (!htmlBody)
        throw new NotFoundError_1.default("HTML body is required!");
    let mailOptions = {
        from: process.env.SERVER_EMAIL,
        to: email,
        subject: subject,
        html: htmlBody,
    };
    if (attachment) {
        mailOptions.attachments = [
            {
                filename: attachment.originalname,
                content: attachment.buffer,
                contentType: attachment.mimetype,
            },
        ];
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            return data;
        }
    });
});
exports.sendEmail = sendEmail;
