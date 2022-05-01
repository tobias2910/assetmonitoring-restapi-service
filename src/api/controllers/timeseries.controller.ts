import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';

import TimeseriesService from "../services/timeseries.service";
import { AssetInformation } from "../typings/asset";
import Redis from '../config/redis';


class TimeSeriesContoller {

    public async obtainTimeSeriesData (req: Request, res: Response, next: NextFunction): Promise <void> {
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
                records = await TimeseriesService.getTimeseriesData(query);
                await Redis.saveResultWithTtl(redisCacheKey, records);    
            }

            res.status(httpStatus.OK).header('X-Total-Count', records.length).json(records);
        } catch (error) {
            next(error);
        }
    };

}

export default TimeSeriesContoller;
