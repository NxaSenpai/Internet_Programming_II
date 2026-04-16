import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../database/entities/orders.entities";
import { NotificationsService } from "src/notifications/notifications.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrdersService {
    constructor(
    @InjectRepository(Order)
    private readonly OrderRepo: Repository<Order>,
    private readonly notifications: NotificationsService,
    ) {}

    async createOrder(orderDto: CreateOrderDto) {
        const order = await this.OrderRepo.save(orderDto);
        const savedOrder = await this.OrderRepo.findOne({ where: { orderId: order.orderId } });
        this.notifications.notify('order_created', { order: savedOrder });

        return { status : 'Order accepted', order: savedOrder };
    }

    async findAll() {
        return this.OrderRepo.find();
    }

    async findOne(id: string) {
        const order = await this.OrderRepo.findOne({ where: { orderId: id } });
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        if (updateOrderDto.name === undefined && updateOrderDto.price === undefined) {
            throw new Error('No valid fields to update');
        }

        const order = await this.findOne(id);

        if (updateOrderDto.name !== undefined) {
            order.name = updateOrderDto.name;
        }
        if (updateOrderDto.price !== undefined) {
            order.price = updateOrderDto.price;
        }

        return this.OrderRepo.save(order);
    }

    async remove(id: string) {
        const order = await this.findOne(id);
        await this.OrderRepo.remove(order);
        return { deleted: true, orderId: id };
    }
}