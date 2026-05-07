import { Module } from '@nestjs/common';
import { CategoryCodeFirstResolver } from './resolvers/category.codefirst.resolver';
import { ProductCodeFirstResolver } from './resolvers/product.codefirst.resolver';

import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
  providers: [CategoryCodeFirstResolver, ProductCodeFirstResolver],
})
export class GraphqlModule {}
