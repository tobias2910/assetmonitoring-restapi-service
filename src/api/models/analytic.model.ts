import { modelOptions, prop } from '@typegoose/typegoose';
import configData from '../config/config';

@modelOptions({
    schemaOptions: {
        collection: configData.mongoDB.analysisCollection
    }
})
export default class Analytic {
    @prop({
            required: true, 
            trim: true
         })
    public AssetType: string;

    @prop({
        required: false, 
        trim: false
     })
    public Country: string;

    @prop({
            required: false,
            trim: false
        })
    public Exchange: string;

    @prop({
        required: false,
        trim: false
    })
    public Industry: string;

    @prop({
        required: true,
        trim: false
    })
    public Name: string;

    @prop({
        required: false,
        trim: false
    })
    public Sector: string;

    @prop({
        required: true,
        trim: true
    })
    public Symbol: string;

    @prop({
        required: true,
    })
    public timestamp: Date;

    @prop({
        required: true,
        trim: false
    })
    public Platform: string;

    @prop({
        required: true,
        trim: false
    })
    public Source: string;

    @prop({
        required: true,
    })
    public Sentiment: number;
}
