import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import assetService from "../services/asset.service";
import { AssetInformation } from "../typings/asset";
import Redis from '../config/redis';

export default class AssetController {

    public async obtainAssetData (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const query: AssetInformation =  {};

            query.AssetType = req.query.assetType;
            query.Name = req.query.name;
            query.Symbol = req.query.symbol;

            Object.keys(query).forEach((key) => query[key] === undefined && delete query[key]);

            const redisCacheKey = `asset_query_${JSON.stringify(query)}`;
            let records = await Redis.getResult(redisCacheKey);

            if (!records) {
                records = await assetService.getAssetData(query, parseInt(<string> req.query.numberRecords));
                await Redis.saveResultWithTtl(redisCacheKey, records);    
            }

            res.status(httpStatus.OK).header('X-Total-Count', records.length).json(records);
        } catch (error) {
            next(error);
        }
    }

    public async updateAssetData (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            await assetService.updateAssetData(<string> req.query.symbol, req.body);

            res.status(httpStatus.OK).json({Symbol: req.query.symbol, Update: req.body});
        } catch (error) {
            next(error);
        }
    }

    public async createNewAsset (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            
            const result = await assetService.createAsset(req.body);

            res.status(httpStatus.CREATED).json(result);

        } catch (error) {
            next (error);
        }
    }

}