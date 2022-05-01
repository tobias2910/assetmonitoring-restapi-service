import { getModelForClass } from '@typegoose/typegoose';
import Analytic from '../models/analytic.model';
import { AssetInformation } from '../typings/asset';

class TimeSeriesService {

    public async getTimeseriesData (query: AssetInformation) {

        const TimeseriesModel = getModelForClass(Analytic);
        
        const records = await TimeseriesModel.aggregate([
            {
              $match: query
            },
            {
              $addFields: {
                Date: {
                  Year: {
                    $year: "$timestamp"
                  },
                  Month: {
                    $month: "$timestamp"
                  },
                  Day: {
                    $dayOfMonth: "$timestamp"
                  }
                }
              }
            },
            {
              $group: {
                _id: {
                  Symbol: "$Symbol",
                  AssetType: "$AssetType",
                  day: {
                    $dayOfMonth: "$timestamp"
                  },
                  month: {
                    $month: "$timestamp"
                  }
                },
                Date: {
                  $first: "$Date"
                },
                Sentiment: {
                  $avg: "$Sentiment"
                },
                Mentions: {
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
                  AssetType: "$_id.AssetType",
                  
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
                  $first: "$_id.Symbol"
                },
                TimeSeriesData: {
                  $push: {
                    Date: "$Date",
                    Sentiment: {
                      $round: [
                        "$Sentiment",
                        3
                      ]
                    },
                    Mentions: {
                      $sum: "$Mentions"
                    }
                  }
                }
              }
            },
            {
              $unset: "_id"
            },
            {
              $replaceRoot: {
                newRoot: {
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
                  $sort: {
                    "Date": -1
                  }
                },
          ])

          return records;
    };
}

export default new TimeSeriesService();
