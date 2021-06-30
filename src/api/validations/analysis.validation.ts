import { IsString, 
         IsEnum, 
         IsOptional, 
         IsNumber } from "class-validator";

enum AssetType {
    Crypto = 'Crypto',
    Fiat = 'Fiat',
    Stock = 'Stock',
}

enum Platform {
    Reddit = 'Reddit',
    Twitter = 'Twitter'
}

export default class Analysis {
    @IsString({message: `Property 'assetType' is not type string.`})
    @IsEnum(AssetType, {message: `Property 'assetType' must be 'Stock', 'Crypto' or 'Fiat'.`})
    @IsOptional()
    public assetType: string;

    @IsString({message: `Property 'name' is not type string.`})
    @IsOptional()
    public name: string;

    @IsString({message: `Property 'symbol' is not type string.`})
    @IsOptional()
    public symbol: string;

    @IsString({message: `Property 'platform' is not type string.`})
    @IsEnum(Platform, {message: `Property 'Platform' must be 'Reddit' or 'Twitter'.`})
    @IsOptional()
    public platform: string;

    @IsString({message: `Property 'source' is not type string.`})
    @IsOptional()
    public source: string;

    @IsNumber({allowInfinity: false, maxDecimalPlaces: 0}, {message: `Property 'numberRecords' is not a number.`})
    @IsOptional()
    public numberRecords: number;
}