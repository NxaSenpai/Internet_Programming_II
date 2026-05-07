import { Resolver, Query, Mutation, Args, ResolveField, Parent, ID } from '@nestjs/graphql';
import { ProductType } from '../types/product.type';
import { CreateProductInput } from '../inputs/create-product.input';
import { ProductService } from '../../products/products.service';
import { CategoryService } from '../../categories/category.service';
import { CategoryType } from '../types/category.type';

@Resolver(() => ProductType)
export class ProductCodeFirstResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [ProductType])
  products() {
    return this.productService.findAll();
  }

  @Query(() => ProductType, { nullable: true })
  product(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => ProductType)
  async createProduct(@Args('input') input: CreateProductInput) {
    const created = await this.productService.createProduct({
      name: input.name,
      price: input.price,
    });
    return created.product;
  }

  @ResolveField(() => CategoryType, { nullable: true })
  category(@Parent() product: ProductType) {
    if (product.categoryId === undefined || product.categoryId === null) {
      return null;
    }

    const categoryId = Number(product.categoryId);
    if (!Number.isFinite(categoryId)) {
      return null;
    }

    return this.categoryService.findOne(categoryId);
  }

  @ResolveField(() => ID)
  id(@Parent() product: any) {
    return product.productId;
  }
}
