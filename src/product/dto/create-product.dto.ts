import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsNotLong } from './product.validation';
export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  @IsNotLong({ message: 'Character not longer than 12 chars' })
  name: string;

  @IsNumber()
  userId: number;
}
