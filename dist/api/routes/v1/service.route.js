"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const service_controller_1 = __importDefault(require("../../controllers/service.controller"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const validationMiddleware_1 = require("../../middleware/validationMiddleware");
const service_validation_1 = __importDefault(require("../../validations/service.validation"));
/**
 *
 */
class ServiceRouter {
    /**
     *
     */
    constructor() {
        this.router = express_1.Router();
        this.serviceController = new service_controller_1.default();
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
        this.router.route('/')
            .post(passport_1.default.authenticate('jwt', { session: false }), validationMiddleware_1.validateBodyMiddleware(service_validation_1.default), this.serviceController.changeState)
            .get(authMiddleware_1.authorizeUser('admin'), this.controller);
    }
    controller(req, res) {
        res.send('All good');
    }
}
exports.default = ServiceRouter;
//# sourceMappingURL=service.route.js.map