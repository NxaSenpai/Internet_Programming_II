import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsModule } from './receipts/receipts.module';
import { OrdersModule } from './orders/orders.module';
import { Receipt } from './database/entities/receipts.entities';
import { Order } from './database/entities/orders.entities';
import { Product } from './database/entities/product.entities';
import { Category } from './database/entities/category.entities';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphqlModule as AppGraphqlModule } from './graphql/graphql.module';


@Module({
  
  imports: [
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      playground: true,
    }),

    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'nakry123',
      database: process.env.DB_NAME || 'tp02_db',
      entities: [Receipt, Order, Category, Product],
      synchronize: true,
      logging: false,
    }),
    ReceiptsModule,
    NotificationsModule,
    OrdersModule,
    CoreModule,
    CategoriesModule,
    ProductsModule,
    AppGraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
