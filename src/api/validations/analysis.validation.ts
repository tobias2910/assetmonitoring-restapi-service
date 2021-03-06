import { Transform, Type } from "class-transformer";
import { IsString, 
         IsEnum, 
         IsOptional, 
         IsNumber, 
         Matches,
         Max,
         Min,
         IsNumberString} from "class-validator";

enum AssetType {
    Crypto = 'Crypto',
    Fiat = 'Fiat',
    Stock = 'Stock',
}

enum Platform {
    Reddit = 'reddit',
    Twitter = 'twitter'
}

export class Asset {
    @IsString({message: `Property 'assetType' is not type string.`})
    @IsEnum(AssetType, {message: `Property 'assetType' must be 'Stock', 'Crypto' or 'Fiat'.`})
    @IsOptional()
    public assetType: string;
}

export class Analysis extends Asset {
    @IsString({message: `Property 'name' is not type string.`})
    @IsOptional()
    public name: string;

    @IsString({message: `Property 'symbol' is not type string.`})
    @IsOptional()
    public symbol: string;

    @IsString({message: `Property 'platform' is not type string.`})
    @IsEnum(Platform, {message: `Property 'Platform' must be 'reddit' or 'twitter'.`})
    @IsOptional()
    public platform: string;

    @IsString({message: `Property 'source' is not type string.`})
    @IsOptional()
    public source: string;

    @IsNumber({allowInfinity: false, maxDecimalPlaces: 0}, {message: `Property 'numberRecords' is not a number.`})
    @IsOptional()
    public numberRecords: number;

    @Matches(/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/, {message: `Property 'endDate' is not a date. Please provide a date in format 'dd.mm.yyyy'`})
    @IsOptional()
    public endDate: Date;

    @Matches(/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/, {message: `Property 'startDate' is not a date. Please provide a date in format 'dd.mm.yyyy'`})
    @IsOptional()
    public startDate: Date;
}

export class AnalysisTopAssets extends Analysis {

    @Max(100, {message: `Property 'limit' can be maximum 100.`})
    @Min(0, {message: `Property 'limit' must be minimum 0.`})
    @Type(() => Number)
    @IsNumber({}, {message: `Property 'limit' is not a number.`})
    @IsOptional()
    public limit: number;
}