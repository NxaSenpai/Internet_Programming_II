import { IsNumber, IsString, IsOptional, Min } from "class-validator";

export class UpdateOrderDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
}

