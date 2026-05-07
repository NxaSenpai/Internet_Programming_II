import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../database/entities/category.entities";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { create } from "domain";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
    ) {}

    async createCategory(categoryDto: CreateCategoryDto) {
        const category = await this.categoryRepo.save(categoryDto);
        return await this.categoryRepo.save(category);
    }

    async findAll() {
        return this.categoryRepo.find();
    }

    async findOne(id: number) {
        const category = await this.categoryRepo.findOne({ where: { id } });
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        if (updateCategoryDto.name === undefined) {
            throw new Error('No valid fields to update');
        }

        const category = await this.findOne(id);

        if (updateCategoryDto.name !== undefined) {
            category.name = updateCategoryDto.name;
        }

        return this.categoryRepo.save(category);
    }

    async remove(id: number) {
        const category = await this.findOne(id);
        await this.categoryRepo.remove(category);
        return { deleted: true, categoryId: id };
    }
}