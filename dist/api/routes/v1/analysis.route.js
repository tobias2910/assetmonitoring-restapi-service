"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = require("../../middleware/validationMiddleware");
const analysis_validation_1 = __importDefault(require("../../validations/analysis.validation"));
const analysis_controller_1 = __importDefault(require("../../controllers/analysis.controller"));
class AnalysisRoute {
    constructor() {
        this.router = express_1.Router();
        this.analysisController = new analysis_controller_1.default();
        this.configureRouter();
    }
    getRouter() {
        return this.router;
    }
    setRouter(router) {
        this.router = router;
    }
    configureRouter() {
        // this.router.use(generalLimiter);
        this.router.get('/', validationMiddleware_1.validateQueryMiddleware(analysis_validation_1.default), this.analysisController.obtainGeneralData);
        this.router.get('/aggregated', validationMiddleware_1.validateQueryMiddleware(analysis_validation_1.default), this.analysisController.obtainAggregatedData);
    }
}
exports.default = AnalysisRoute;
//# sourceMappingURL=analysis.route.js.map