import { IsString, IsNotEmpty, Min, IsNumber } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
}