import { Injectable } from '@nestjs/common';
import { ProductCreateDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRespository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
  ) {}

  async activeProducts(): Promise<Product[]> {
    return await this.productRespository.find();
  }

  async getById(id: number): Promise<Product> {
    return await this.productRespository.findOne({
      where: {
        id,
      },
    });
  }

  async create(productCreateDto: ProductCreateDto): Promise<Product> {
    const newProduct = new Product();
    const searchedUser = await this.userRespository.findOne({
      where: {
        id: productCreateDto.userId,
      },
    });
    newProduct.name = productCreateDto.name;
    newProduct.user = searchedUser;

    searchedUser && searchedUser.products?.push(newProduct);
    await this.userRespository.save(searchedUser);
    return await this.productRespository.save(newProduct);
  }

  async update(id: number, updatedProduct: ProductCreateDto) {
    const searchProduct = await this.productRespository.findOne({
      where: {
        id,
      },
    });

    if (searchProduct) {
      searchProduct.name = updatedProduct.name;
    }

    return this.productRespository.save(searchProduct);
  }

  async delete(id: number) {
    return this.productRespository.softDelete(id);
  }
}
