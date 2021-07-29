import { IsString, 
    IsEnum, 
    IsOptional, 
    IsUppercase,
    IsEmpty,
    IsNotEmpty,
    MinLength,
    MaxLength} from "class-validator";

enum AssetType {
    Crypto = 'Crypto',
    Fiat = 'Fiat',
    Stock = 'Stock',
}

export class GetAsset {
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
}

export class Asset {
    @IsString({message: `Property 'Symbol' is not type string.`})
    @IsNotEmpty({message: `Property 'Symbol' is missing in the body.`})
    public Symbol: string;
}

export class UpdateAssetBody extends Asset {
    @IsString({message: `Property 'Name' is not type string.`})
    @IsNotEmpty({message: `Property 'Name' is missing in the body.`})
    public Name: string;
}

export class UpdateAssetQuery {
    @IsString({message: `Property 'symbol' is not type string.`})
    @IsNotEmpty({message: `Property 'symbol' is missing in the body.`})
    public symbol: string; 

    @IsString({message: `Property 'assetType' is not type string.`})
    @IsEnum(AssetType, {message: `Property 'assetType' must be 'Stock', 'Crypto' or 'Fiat'.`})
    @IsNotEmpty({message: `Property 'assetType' is missing in the body.`})
    public assetType: string; 
}

export class CreateAsset extends Asset {
    @IsEnum(AssetType, {message: `Property 'AssetType' must be 'Stock', 'Crypto' or 'Fiat'.`})
    @IsString({message: `Property 'AssetType' is not type string.`})
    @IsNotEmpty({message: `Property 'AssetType' is missing in the body.`})
    public AssetType: string;

    @IsString({message: `Property 'Name' is not type string.`})
    @IsNotEmpty({message: `Property 'Name' is missing in the body.`})
    public Name: string;

    @IsString({message: `Property 'Country' is not type string.`})
    @MaxLength(2, {message: `Property 'Country' must have a length of min. and max. two characters (e.g. US).`})
    @MinLength(2, {message: `Property 'Country' must have a length of min. and max. two characters (e.g. US).`})
    @IsOptional()
    public Country: string;

    @IsString({message: `Property 'Exchange' is not type string.`})
    @IsOptional()
    public Exchange: string;

    @IsString({message: `Property 'Industry' is not type string.`})
    @IsOptional()
    public Industry: string;

    @IsString({message: `Property 'Sector' is not type string.`})
    @IsOptional()
    public Sector: string;
}