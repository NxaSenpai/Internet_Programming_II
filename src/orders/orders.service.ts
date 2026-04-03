import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { NotificationsService } from "src/notifications/notifications.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../database/entities/orders.entities";

@Injectable()
export class OrdersService {
    constructor(
    @Inject('ORDERS_SERVICE') private client: ClientProxy,
    private readonly notifications: NotificationsService,
    ) {}

    createOrder(orderDto: any) {
        this.client.emit('order_created', { order: orderDto , createdAt: new Date().toISOString() });
        this.notifications.notify('order_created', { order : orderDto });

        return { status : 'Order accepted', order: orderDto };
    }

    findAll() {
        return this.client.send({ cmd: 'get_orders' }, {});
    }

    findOne(id: string) {
        return this.client.send({ cmd: 'get_order' }, { id });
    }
}