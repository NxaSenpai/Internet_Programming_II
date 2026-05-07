import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../database/entities/category.entities";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "src/database/entities/product.entities";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) {}

    async createProduct(productDto: CreateProductDto) {
        const product = await this.productRepo.save(productDto);
        return { status : 'Product created', product };
    }
    
    async findAll() {
        return this.productRepo.find();
    }

    async findOne(id: string) {
        const product = await this.productRepo.findOne({ where: { productId: id } });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        if (updateProductDto.name === undefined && updateProductDto.price === undefined) {
            throw new Error('No valid fields to update');
        }

        const product = await this.findOne(id);

        if (updateProductDto.name !== undefined) {
            product.name = updateProductDto.name;
        }

        if (updateProductDto.price !== undefined) {
            product.price = updateProductDto.price;
        }

        return this.productRepo.save(product);
    }

    async remove(id: string) {
        const product = await this.findOne(id);
        await this.productRepo.remove(product);
        return { deleted: true, productId: id };
    }
}
