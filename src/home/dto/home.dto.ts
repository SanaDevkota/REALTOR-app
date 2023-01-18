import { PropertyType } from "@prisma/client";
import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";


export class HomeResponseDTO {
    id: string;
    name: string;
    address: string;
    price: number;
    description: string;
    number_of_bedrooms: number;
    number_of_bathrooms: number;
    city: string;
    listed_date: Date;
    propertyType: string;
    land_size: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<HomeResponseDTO>) {
        return Object.assign(this, partial);
    }

}


class Image {
    @IsString()
    @IsNotEmpty()
    url: string
}


export class CreateHomeDTO {
    @IsString()
    @IsNotEmpty()
    address: string;


    @IsNumber()
    @IsPositive()
    numberOfBathrooms: number;

    @IsNumber()
    @IsPositive()
    numberOfBedrooms: number;




    @IsString()
    @IsNotEmpty()
    city: string;



    @IsNumber()
    @IsNotEmpty()
    price: number




    @IsNumber()
    @IsNotEmpty()
    land_size: number;


    @IsEnum(PropertyType)
    @IsString()
    @IsNotEmpty()
    propertyType: PropertyType;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Image)
    @IsOptional()
    images?: Image[];


}

export class UpdateHomeDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    address?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    number_of_bathrooms?: number;
    @IsOptional()
    @IsNumber()
    @IsPositive()
    number_of_bedrooms?: number;



    @IsOptional()
    @IsString()
    @IsNotEmpty()
    city?: string;


    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    price?: number



    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    land_size?: number;

    @IsOptional()
    @IsEnum(PropertyType)
    @IsString()
    @IsNotEmpty()
    propertyType?: PropertyType;
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Image)
    @IsOptional()
    images?: Image[];


}
