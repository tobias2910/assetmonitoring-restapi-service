import { getModelForClass } from '@typegoose/typegoose';
import Asset from '../models/asset.model';
import { AssetInformation } from '../typings/asset';

class AssetService {

    /**
     * 
     * @param query 
     * @param numberRecords 
     * @returns 
     */
    public async getAssetData(query: AssetInformation, numberRecords?: number) {
        const AssetModel = getModelForClass(Asset);
        if (!numberRecords) {
            numberRecords = parseInt(process.env.LIMIT_RECORDS!)
        }

        let records = await AssetModel.find(query).limit(numberRecords);

        if (records) {
            records = records.map((el: any) => {
                delete el._doc._id;
                return el;
            })
        }

        return records;
    }

    /**
   * 
   * @param query 
   * @param numberRecords 
   * @returns 
   */
    public async searchAssetData(query: { searchQuery: string }) {
        const AssetModel = getModelForClass(Asset);

        let records = await AssetModel.find({ $text: { $search: query.searchQuery } });

        if (records) {
            records = records.map((el: any) => {
                delete el._doc._id;
                return el;
            })
        }

        return records;
    }

    /**
     * 
     * @param assetName 
     * @param updateBody 
     * @returns 
     */
    public async updateAssetData(assetName: string, updateBody: AssetInformation) {
        const AssetModel = getModelForClass(Asset);

        const result = await AssetModel.updateOne({ Symbol: assetName }, { $set: updateBody });

        return result;
    }

    /**
     * 
     * @param assetBody 
     * @returns 
     */
    public async createAsset(assetBody: AssetInformation) {
        const AssetModel = getModelForClass(Asset);

        const asset = await AssetModel.findOne({ Symbol: assetBody.Symbol, AssetType: assetBody.AssetType });
        if (asset) {
            throw new Error(`Asset '${assetBody.Symbol}' as Type ${assetBody.AssetType} already available in the database.`);
        }

        let result = await AssetModel.create(assetBody);

        if (result) {
            delete result._id;
            delete result.__v;
        }

        return result;
    }
}

export default new AssetService();