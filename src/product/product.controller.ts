import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  activeProduct() {
    return this.productService.activeProducts();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.productService.getById(id);
  }

  @Post()
  create(@Body() productCreateDto: ProductCreateDto) {
    return this.productService.create(productCreateDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: ProductCreateDto) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
