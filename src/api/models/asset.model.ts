import { prop } from '@typegoose/typegoose';

export default class Asset {
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
}
