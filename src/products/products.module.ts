import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { Product } from "../database/entities/product.entities";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductsModule {}  
