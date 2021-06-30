"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = require("../../middleware/validationMiddleware");
const user_validation_1 = require("../../validations/user.validation");
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const rateLimiter_1 = require("../../config/rateLimiter");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.userController = new user_controller_1.default();
        this.configureRouter();
    }
    getRouter() {
        return this.router;
    }
    setRouter(router) {
        this.router = router;
    }
    configureRouter() {
        this.router.use(rateLimiter_1.registerLimiter);
        this.router.post('/', validationMiddleware_1.validateBodyMiddleware(user_validation_1.CreateUser), this.userController.createNewUser);
        this.router.get('/');
        this.router.get('/:UserId');
    }
}
exports.default = UserRouter;
//# sourceMappingURL=user.route.js.map