import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { CategoryType } from './category.type';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => ID, { nullable: true })
  categoryId?: string;

  @Field(() => CategoryType, { nullable: true })
  category?: CategoryType;
}
