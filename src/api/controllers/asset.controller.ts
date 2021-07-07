import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import assetService from "../services/asset.service";
import { AssetInformation } from "../typings/asset";

export default class AssetController {

    public async obtainAssetData (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const query: AssetInformation =  {};

            query.AssetType = req.query.assetType;
            query.Name = req.query.name;
            query.Symbol = req.query.symbol;

            Object.keys(query).forEach((key) => query[key] === undefined && delete query[key]);

            const records = await assetService.getAssetData(query, parseInt(<string> req.query.numberRecords));
            res.status(httpStatus.OK).header('X-Total-Count', records.length).json({length: records.length, records: records});
        } catch (error) {
            next(error);
        }
    }

    public async updateAssetData (req: Request, res: Response, next: NextFunction): Promise <void> {
        try {

            const result = await assetService.updateAssetData(<string> req.query.symbol, req.body);

            res.status(httpStatus.OK).json({result});

        } catch (error) {
            next(error);
        }
    }

}