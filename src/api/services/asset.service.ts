import { getModelForClass } from '@typegoose/typegoose';
import Asset from '../models/asset.model';
import { AssetInformation } from '../typings/asset';

class AssetService {

    public async getAssetData (query: AssetInformation, numberRecords?: number) {
        const AssetModel = getModelForClass(Asset);
        if (!numberRecords) {
            numberRecords = 1000
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

    public async updateAssetData (assetName: string, updateBody: AssetInformation) {
        const AssetModel = getModelForClass(Asset);

        const result = await AssetModel.update({Symbol: assetName}, {$set: updateBody});

        return result;
    }
}

export default new AssetService();