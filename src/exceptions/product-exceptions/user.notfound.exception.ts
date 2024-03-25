import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor(productId: number) {
    super(`Product id:${productId} is not found`, HttpStatus.NOT_FOUND);
  }
}
