import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;
}