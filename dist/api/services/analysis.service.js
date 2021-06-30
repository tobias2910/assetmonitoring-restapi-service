"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const analytic_model_1 = __importDefault(require("../models/analytic.model"));
class AnalysisService {
    async getGeneralData(query, numberRecords) {
        const AnalysisModel = typegoose_1.getModelForClass(analytic_model_1.default);
        let limit = 5000;
        if (numberRecords) {
            limit = numberRecords;
        }
        let records = await AnalysisModel.find(query).limit(limit);
        if (records) {
            records = records.map((el) => {
                delete el._doc._id;
                return el;
            });
        }
        return records;
    }
    /**
     *
     * @param query
     * @returns
     */
    async getAggregatedDate(query) {
        const AnalysisModel = typegoose_1.getModelForClass(analytic_model_1.default);
        let records = await AnalysisModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: '$Symbol',
                    Symbol: { $first: '$Symbol' },
                    AssetType: { $first: '$AssetType' },
                    Country: { $first: '$Country' },
                    Exchange: { $first: '$Exchange' },
                    Industry: { $first: '$Industry' },
                    Name: { $first: '$Name' },
                    Sector: { $first: '$Sector' },
                    Sentiment: { $avg: '$Sentiment' },
                    Mentions: { $sum: 1 }
                }
            },
            {
                $addFields: {
                    _id: '$_id',
                    Sentiment: { $round: ['$Sentiment', 3] }
                }
            },
            {
                $replaceRoot: {
                    'newRoot': {
                        $arrayToObject: {
                            $filter: {
                                input: { $objectToArray: '$$ROOT' },
                                cond: { $ne: ['$$this.v', null] }
                            }
                        }
                    }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $unset: '_id'
            },
        ]);
        return records;
    }
}
exports.default = new AnalysisService();
//# sourceMappingURL=analysis.service.js.map