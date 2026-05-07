import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => ID)
  categoryId: number;
}