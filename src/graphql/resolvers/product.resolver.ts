import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService } from '../../products/products.service';
import { CategoryService } from '../../categories/category.service';

@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query('products')
  products() {
    return this.productService.findAll();
  }

  @Query('product')
  product(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation('createProduct')
  createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('categoryId') categoryId: string,
  ) {
    return this.productService.createProduct({
      name,
      price,
    });
  }

  @ResolveField('category')
  category(@Parent() product: any) {
    if (!product?.categoryId) {
      return null;
    }
    return this.categoryService.findOne(product.categoryId);
  }

  @ResolveField('id')
  id(@Parent() product: any) {
    return product.productId;
  }
}
