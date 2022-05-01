import { getModelForClass } from '@typegoose/typegoose';
import Analytic from '../models/analytic.model';
import { AssetInformation } from '../typings/asset';

class AnalysisService {

  /**
   * 
   * @param query 
   * @param numberRecords 
   * @returns 
   */
  public async getGeneralData(query: AssetInformation, numberRecords?: number) {
    const AnalysisModel = getModelForClass(Analytic);

    if (!numberRecords) {
      numberRecords = parseInt(process.env.LIMIT_RECORDS!)
    }

    let records = await AnalysisModel.find(query).limit(numberRecords).sort( {timestamp: -1 });

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
  public async getAggregatedDate(query: AssetInformation) {
    const AnalysisModel = getModelForClass(Analytic);
    let records = await AnalysisModel.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: {
            Symbol: "$Symbol",
            Platform: "$Platform",
            Source: "$Source",
            AssetType: "$AssetType"
          },
          TotalSentiment: {
            $avg: "$Sentiment"
          },
          TotalMentions: {
            $sum: 1
          },
          Document: {
            $first: "$$ROOT"
          }
        }
      },
      {
        $group: {
          _id: {
            Symbol: "$_id.Symbol",
            Platform: "$_id.Platform",
            AssetType: "$AssetType"
          },
          val: {
            $addToSet: {
              Source: "$_id.Source",
              Mentions: {
                $sum: "$TotalMentions"
              },
              Sentiment: {
                $round: [
                  "$TotalSentiment",
                  3
                ]
              }
            }
          },
          TotalSentiment: {
            $avg: "$TotalSentiment"
          },
          TotalMentions: {
            $sum: "$TotalMentions"
          },
          Document: {
            $first: "$Document"
          }
        }
      },
      {
        $group: {
          _id: {
            Symbol: "$_id.Symbol",
            AssetType: "$AssetType"
          },
          AssetType: {
            $first: "$Document.AssetType"
          },
          Country: {
            $first: "$Document.Country"
          },
          Exchange: {
            $first: "$Document.Exchange"
          },
          Industry: {
            $first: "$Document.Industry"
          },
          Name: {
            $first: "$Document.Name"
          },
          Sector: {
            $first: "$Document.Sector"
          },
          Symbol: {
            "$first": "$_id.Symbol"
          },
          Analysis: {
            "$push": {
              Platform: "$_id.Platform",
              TotalSentiment: {
                $round: [
                  "$TotalSentiment",
                  3
                ]
              },
              TotalMentions: {
                $sum: "$TotalMentions"
              },
              Sources: "$val"
            }
          }
        }
      },
      {
        $unset: "_id"
      },
      {
        $replaceRoot: {
          "newRoot": {
            $arrayToObject: {
              $filter: {
                input: {
                  $objectToArray: "$$ROOT"
                },
                cond: {
                  $ne: [
                    "$$this.v",
                    null
                  ]

                }
              }
            }
          }
        }
      }
    ]);

    return records;
  }

  public async getAggregatedTopAssets(query: AssetInformation, limit: number) {
    const AnalysisModel = getModelForClass(Analytic);
    const records = await AnalysisModel.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: {
            Symbol: "$Symbol",
            Platform: "$Platform",
            Source: "$Source",
            AssetType: "$AssetType"
          },
          TotalSentiment: {
            $avg: "$Sentiment"
          },
          TotalMentions: {
            $sum: 1
          },
          Document: {
            $first: "$$ROOT"
          }
        }
      },
      {
        $group: {
          _id: {
            Symbol: "$_id.Symbol",
            Platform: "$_id.Platform",
            AssetType: "$AssetType"
          },
          val: {
            $addToSet: {
              Source: "$_id.Source",
              Mentions: {
                $sum: "$TotalMentions"
              },
              Sentiment: {
                $round: [
                  "$TotalSentiment",
                  3
                ]
              }
            }
          },
          TotalSentiment: {
            $avg: "$TotalSentiment"
          },
          TotalMentions: {
            $sum: "$TotalMentions"
          },
          Document: {
            $first: "$Document"
          }
        }
      },
      {
        $group: {
          _id: {
            Symbol: "$_id.Symbol",
            AssetType: "$AssetType"
          },
          AssetType: {
            $first: "$Document.AssetType"
          },
          Country: {
            $first: "$Document.Country"
          },
          Exchange: {
            $first: "$Document.Exchange"
          },
          Industry: {
            $first: "$Document.Industry"
          },
          Name: {
            $first: "$Document.Name"
          },
          Sector: {
            $first: "$Document.Sector"
          },
          Symbol: {
            "$first": "$_id.Symbol"
          },
          TotalMentions: {
            $sum: "$TotalMentions"
          },
          Analysis: {
            "$push": {
              Platform: "$_id.Platform",
              TotalSentiment: {
                $round: [
                  "$TotalSentiment",
                  3
                ]
              },
              TotalMentions: {
                $sum: "$TotalMentions"
              },
              Sources: "$val"
            }
          }
        }
      },
      {
        $sort: {
          "TotalMentions": -1
        }
      },
      {
        $unset: [
          "_id",
          "TotalMentions"
        ]
      },
      {
        $replaceRoot: {
          "newRoot": {
            $arrayToObject: {
              $filter: {
                input: {
                  $objectToArray: "$$ROOT"
                },
                cond: {
                  $ne: [
                    "$$this.v",
                    null
                  ]
                }
              }
            }
          }
        }
      },
      {
        $limit: limit
      }
    ]);

    return records;
  }
}

export default new AnalysisService();