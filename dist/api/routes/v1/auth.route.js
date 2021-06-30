"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const validationMiddleware_1 = require("../../middleware/validationMiddleware");
const auth_validation_1 = __importDefault(require("../../validations/auth.validation"));
class AuthRouter {
    constructor() {
        this.router = express_1.Router();
        this.authController = new auth_controller_1.default();
        this.configureRoutes();
    }
    /**
     *
     * @returns Router
     */
    getRouter() {
        return this.router;
    }
    /**
     *
     * @param {Router} router -
     */
    setRouter(router) {
        this.router = router;
    }
    /**
     *
     */
    configureRoutes() {
        this.router.post('/login', validationMiddleware_1.validateBodyMiddleware(auth_validation_1.default), this.authController.login);
    }
}
exports.default = AuthRouter;
//# sourceMappingURL=auth.route.js.map