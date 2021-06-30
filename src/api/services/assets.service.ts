import { getModelForClass } from '@typegoose/typegoose';
import Asset from '../models/asset.model';
import { GeneralInformation } from '../types/analysis';

class AnalysisService {

    public async getGeneralData (query: GeneralInformation, numberRecords?: number) {
        const AnalysisModel = getModelForClass(Asset);

        let records = await AnalysisModel.find(query).limit(numberRecords);

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
     * @returns 
     */
    public async getAggregatedDate (query: GeneralInformation) {
        const AnalysisModel = getModelForClass(Asset);
        
        let records = await AnalysisModel.aggregate([
            {$match: query},
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
                    Sentiment: {$round: ['$Sentiment', 3]}
                }
            },
            {
                $replaceRoot: {
                    'newRoot': {
                        $arrayToObject: {
                            $filter: {
                                input: { $objectToArray: '$$ROOT'},
                                cond: { $ne: [ '$$this.v', null ] }
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

export default new AnalysisService ();