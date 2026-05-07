import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
}