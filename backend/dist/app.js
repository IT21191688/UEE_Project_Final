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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const common_config_1 = require("./common/common.config");
const cronJob_1 = require("./util/cronJob");
const error_middleware_1 = __importDefault(require("./error/error.middleware"));
require("express-async-errors");
const NotFoundError_1 = __importDefault(require("./error/error.classes/NotFoundError"));
const mapping_1 = __importDefault(require("./mapping"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//api router Mappings
(0, mapping_1.default)(app);
//error handler middleware
app.use(error_middleware_1.default);
//404 not found route
app.all("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new NotFoundError_1.default("API endpoint not found!");
}));
//setup cron jobs
(0, cronJob_1.sendAppointmentReminders)();
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.PORT || 5000;
    try {
        app.listen(port, () => {
            console.log(`SERVER IS LISTENING ON PORT ${port}..!`);
            (0, common_config_1.connectDB)();
        });
    }
    catch (e) {
        console.log(e);
    }
});
start();
