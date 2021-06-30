"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const analysis_route_1 = __importDefault(require("./analysis.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const docs_route_1 = __importDefault(require("./docs.route"));
const user_route_1 = __importDefault(require("./user.route"));
exports.router = express_1.Router();
// Create instances of the routers
const analysisRoute = new analysis_route_1.default();
const authRouter = new auth_route_1.default();
const userRouter = new user_route_1.default();
const swaggerRouter = new docs_route_1.default();
// Register the routers
exports.router.use('/analysis', analysisRoute.getRouter());
exports.router.use('/auth', authRouter.getRouter());
exports.router.use('/user', userRouter.getRouter());
// Swagger documentation
exports.router.use(`/swagger`, swaggerRouter.getRouter());
//# sourceMappingURL=index.js.map