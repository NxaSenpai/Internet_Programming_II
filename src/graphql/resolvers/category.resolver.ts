import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from '../../categories/category.service';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query('categories')
  categories() {
    return this.categoryService.findAll(); 
  }

  @Mutation('createCategory')
  createCategory(@Args('name') name: string) {
    return this.categoryService.createCategory({ name });
  }
}