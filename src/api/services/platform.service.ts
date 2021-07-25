import { getModelForClass } from '@typegoose/typegoose';
import Platform from '../models/platform.model';
import { AssetInformation } from '../typings/asset';

class PlatformService {

    /**
     * 
     * @param {AssetInformation} assetType -  
     * @returns 
     */
    public async getPlatformData (query: AssetInformation) {
        const PlatformModel = getModelForClass(Platform);

        let records = await PlatformModel.aggregate([
          {
            $match: query
          },
          {
            $group: {
              _id: {
                Platform: "$Platform",
                Source: "$Source"
              },
              MentionsTotal: {
                $sum: 1
              },
              AssetType: {
                $first: "$AssetType"
              }
            }
          },
          {
            $group: {
              _id: "$_id.Platform",
              Platform: {
                $first: "$_id.Platform"
              },
              Sources: {
                $push: {
                  Name: "$_id.Source",
                  Type: "$AssetType"
                }
              }
            }
          },
          {
            $sort: {
              _id: 1,
              "Sources.Source": 1
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
          $unset: "_id"
        }
        ]);

        return records;
    }

    /**
     * 
     * @param {AssetInformation} query - 
     * @returns 
    */
    public async getAggregatedDate (query: AssetInformation) {
        const PlatformModel = getModelForClass(Platform);
        
        let records = await PlatformModel.aggregate([
            {
              $match: query
            },
            {
              $group: {
                _id: {
                  Platform: "$Platform",
                  Source: "$Source"
                },
                Sentiment: {
                  $avg: "$Sentiment"
                },
                MentionsTotal: {
                  $sum: 1
                },
                AssetType: {
                  $first: "$AssetType"
                }
              }
            },
            {
              $group: {
                _id: "$_id.Platform",
                Platform: {
                  $first: "$_id.Platform"
                },
                MentionsTotal: {
                  $sum: "$MentionsTotal"
                },
                Sources: {
                  $push: {
                    Mentions: "$MentionsTotal",
                    Sentiment: {
                      $round: [
                        {
                          $avg: "$Sentiment"
                        },
                        3
                      ]
                    },
                    Source: "$_id.Source",
                    Type: "$AssetType"
                  }
                }
              }
            },
            {
              $sort: {
                _id: 1,
                "Sources.Source": 1
              }
            },
            {
              $unset: "_id"
            }
        ]);

        return records;
    }
}

export default new PlatformService ();