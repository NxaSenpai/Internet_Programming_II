import { Module } from '@nestjs/common';
import { CategoryResolver } from './resolvers/category.resolver';
import { ProductResolver } from './resolvers/product.resolver';

import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
  providers: [CategoryResolver, ProductResolver],
})
export class GraphqlModule {}