import { Controller } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Body, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Get()
    async findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.categoryService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Patch(':id')
    async updatePartial(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.categoryService.remove(id);
    }
}
