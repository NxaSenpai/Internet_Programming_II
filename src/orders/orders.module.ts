import { NotificationsModule } from "src/notifications/notifications.module";
import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Module ({
    imports: [NotificationsModule],
    providers: [OrdersService],
    exports: [OrdersService],   
})
export class OrdersModule {}