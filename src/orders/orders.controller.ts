import { OrdersService } from "./orders.service";
import { Controller, Post, Body, Get } from "@nestjs/common";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Body('id') id: string) {
        return this.ordersService.findOne(id);
    }

}