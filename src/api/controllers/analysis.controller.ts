import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import moment from "moment";
import analysisService from "../services/analysis.service";
import { AssetInformation } from "../typings/asset";
import Redis from '../config/redis';

export default class AnalysisController {

    public async obtainGeneralData (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const query: AssetInformation =  {};

            query.AssetType = req.query.assetType;
            query.Name = req.query.name;
            query.Platform = req.query.platform;
            query.Symbol = req.query.symbol;
            query.Platform = req.query.platform;
            query.Source = req.query.source;

            Object.keys(query).forEach((key) => query[key] === undefined && delete query[key]);

            const redisCacheKey = `analysis_query_${JSON.stringify(query)}`;
            let records = await Redis.getResult(redisCacheKey);

            if (!records) {
                records = await analysisService.getGeneralData(query, parseInt(<string> req.query.numberRecords));
                await Redis.saveResultWithTtl(redisCacheKey, records);    
            }

            res.status(httpStatus.OK).header('X-Total-Count', records.length).json(records);
        } catch (error) {
            next(error);
        }
    }

    public async obtainAggregatedData (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const query: AssetInformation =  {};
            
            query.AssetType = req.query.assetType;
            query.Name = req.query.name;
            query.Platform = req.query.platform;
            query.Symbol = req.query.symbol;
            query.Platform = req.query.platform;
            query.Source = req.query.source;

            let startDate: moment.Moment | undefined = undefined;
            let endDate: moment.Moment | undefined = undefined;

            if (req.query.startDate) {
                startDate = moment(<any> req.query.startDate, 'DD.MM.yyyy');
                if (!startDate.isValid()) {
                    throw new Error (`The parameter 'startDate' contains an invalid date.`);
                }
                query.timestamp = {};
                query.timestamp['$gte'] = new Date(startDate.toISOString())
            }

            if (req.query.endDate) {
                endDate = moment(<any> req.query.endDate, 'DD.MM.yyyy');
                if (startDate && startDate > endDate) {
                    throw new Error (`The parameter 'startDate' cannot be before 'endDate'`);
                } else if (!endDate.isValid()) {
                    throw new Error (`The parameter 'endDate' contains an invalid date.`);
                }
                if(!query.timestamp) {query.timestamp = {}}; 
                query.timestamp['$lte'] = new Date(endDate.toISOString());
            }

            Object.keys(query).forEach((key) => query[key] === undefined && delete query[key]);

            const redisCacheKey = `aggregated_analysis_query_${JSON.stringify(query)}`;
            let records = await Redis.getResult(redisCacheKey);

            if (!records) {
                records = await analysisService.getAggregatedDate(query);
                await Redis.saveResultWithTtl(redisCacheKey, records);    
            }

            res.status(httpStatus.OK).header('X-Total-Count', records.length).json(records);
        } catch (error) {
            next(error);
        }
    }

}
