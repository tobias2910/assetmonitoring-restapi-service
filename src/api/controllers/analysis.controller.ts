import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import analysisService from "../services/analysis.service";
import { GeneralInformation } from "../types/analysis";

export default class AnalysisController {

    public async obtainGeneralData (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const query: GeneralInformation =  {};
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

            const records = await analysisService.getGeneralData(query, parseInt(<string> req.query.numberRecords));
            res.status(httpStatus.OK).header('X-Total-Count', records.length).json({length: records.length, records: records});
        } catch (error) {
            next(error);
        }
    }

    public async obtainAggregatedData (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const query: GeneralInformation =  {};
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

            const records = await analysisService.getAggregatedDate(query);
            res.status(httpStatus.OK).header('X-Total-Count', records.length).json({length: records.length, records: records});
        } catch (error) {
            next(error);
        }
    }

}
