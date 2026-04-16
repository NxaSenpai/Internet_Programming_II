import { NotificationsModule } from "src/notifications/notifications.module";
import { forwardRef, Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Order } from "../database/entities/orders.entities";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module ({
    imports: [
        TypeOrmModule.forFeature([Order]),
        forwardRef(() => NotificationsModule)
    ],
    providers: [OrdersService],
    exports: [OrdersService],   
    controllers: [OrdersController],
})
export class OrdersModule {}