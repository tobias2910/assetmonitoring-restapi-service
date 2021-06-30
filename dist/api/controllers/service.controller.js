"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceController {
    async changeState(req, res) {
        if (req.body.state) {
            res.status(200).json({ status: 'Service started.' });
        }
        else {
            res.status(200).json({ status: 'Service stopped.' });
        }
    }
    async getState(req, res) {
        res.status(200).json({ status: 'active' });
    }
}
exports.default = ServiceController;
//# sourceMappingURL=service.controller.js.map