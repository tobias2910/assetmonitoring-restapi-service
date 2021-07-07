import { IsString, 
    IsEnum, 
    IsOptional, 
    IsUppercase,
    IsEmpty,
    IsNotEmpty} from "class-validator";

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

export class UpdateAssetBody {
    @IsString({message: `Property 'Name' is not type string.`})
    @IsOptional()
    public Name: string;

    @IsString({message: `Property 'Symbol' is not type string.`})
    @IsNotEmpty({message: `Property 'Symbol' is missing in the body.`})
    public Symbol: string;
}

export class UpdateAssetQuery {
    @IsString({message: `Property 'Symbol' is not type string.`})
    @IsNotEmpty({message: `Property 'Symbol' is missing in the body.`})
    public symbol: string;
}