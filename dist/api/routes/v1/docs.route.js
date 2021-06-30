"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../../docs/swagger.json"));
const httpException_1 = __importDefault(require("../../utils/httpException"));
class SwaggerRouter {
    constructor() {
        this.router = express_1.Router();
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
        this.router.use('/', swagger_ui_express_1.default.serve);
        this.router.get('/', swagger_ui_express_1.default.setup(swagger_json_1.default, {
            explorer: true
        }));
        // Handle all other Methods
        this.router.all('/', (req, res) => {
            throw new httpException_1.default(405, `Method '${req.method}' not allowed.`);
        });
    }
}
exports.default = SwaggerRouter;
//# sourceMappingURL=docs.route.js.map