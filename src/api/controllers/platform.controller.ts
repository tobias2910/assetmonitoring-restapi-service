import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import moment from "moment";
import platformService from "../services/platform.service";
import { AssetInformation } from "../typings/asset";
import Redis from '../config/redis';

export default class AssetController {

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public async obtainPlatformInformation (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const query: AssetInformation =  {};

            if (req.query.assetType) {
                query.AssetType = req.query.assetType;
            }

            const redisCacheKey = `platform_query_${JSON.stringify(query)}`;
            let records = await Redis.getResult(redisCacheKey);

            if (!records) {
                records = await platformService.getPlatformData(query);
                await Redis.saveResultWithTtl(redisCacheKey, records);    
            }

            res.status(httpStatus.OK).header('X-Total-Count', records.length).json(records);
        } catch (error) {
            next(error);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public async obtainAggregatedPlatformSentiment (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const query: AssetInformation =  {};

            query.AssetType = req.query.assetType;
            query.Name = req.query.name;
            query.Platform = req.query.platform;
            query.Symbol = req.query.symbol;
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
            
            const redisCacheKey = `platform_agg_query_${JSON.stringify(query)}`;
            let records = await Redis.getResult(redisCacheKey);

            if (!records) {
                records = await platformService.getAggregatedDate(query);
                await Redis.saveResultWithTtl(redisCacheKey, records);    
            }
            
            res.status(httpStatus.OK).header('X-Total-Count', records.length).json(records);
        } catch (error) {
            next(error);
        }
    }

}