import { Controller } from "@nestjs/common";
import { ProductService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Body, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto);
    }

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Patch(':id')
    async updatePartial(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }
}
