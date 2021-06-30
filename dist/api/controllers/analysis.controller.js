"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const analysis_service_1 = __importDefault(require("../services/analysis.service"));
class AnalysisController {
    async obtainGeneralData(req, res, next) {
        try {
            const query = {};
            if (req.query.assetType) {
                query.AssetType = req.query.assetType;
            }
            if (req.query.name) {
                query.Name = req.query.name;
            }
            if (req.query.platform) {
                query.Platform = req.query.platform;
            }
            if (req.query.symbol) {
                query.Symbol = req.query.symbol;
            }
            if (req.query.platform) {
                query.Platform = req.query.platform;
            }
            if (req.query.source) {
                query.Source = req.query.source;
            }
            const records = await analysis_service_1.default.getGeneralData(query, parseInt(req.query.numberRecords));
            res.status(http_status_1.default.OK).header('X-Total-Count', records.length).json({ length: records.length, records: records });
        }
        catch (error) {
            next(error);
        }
    }
    async obtainAggregatedData(req, res, next) {
        try {
            const query = {};
            if (req.query.assetType) {
                query.AssetType = req.query.assetType;
            }
            if (req.query.name) {
                query.Name = req.query.name;
            }
            if (req.query.platform) {
                query.Platform = req.query.platform;
            }
            if (req.query.symbol) {
                query.Symbol = req.query.symbol;
            }
            if (req.query.platform) {
                query.Platform = req.query.platform;
            }
            if (req.query.source) {
                query.Source = req.query.source;
            }
            const records = await analysis_service_1.default.getAggregatedDate(query);
            res.status(http_status_1.default.OK).header('X-Total-Count', records.length).json({ length: records.length, records: records });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AnalysisController;
//# sourceMappingURL=analysis.controller.js.map