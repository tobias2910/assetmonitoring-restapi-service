"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class GeneralRouter {
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
        this.router.get('/', (req, res) => {
            res.status(200).json({ message: 'Server is up and running' });
        });
    }
}
exports.default = GeneralRouter;
//# sourceMappingURL=general.route.js.map