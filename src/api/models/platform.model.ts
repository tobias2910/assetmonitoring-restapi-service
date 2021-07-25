import { modelOptions, prop } from '@typegoose/typegoose';
import configData from '../config/config';

@modelOptions({
    schemaOptions: {
        collection: configData.mongoDB.analysisCollection
    }
})
export default class Platform {
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
