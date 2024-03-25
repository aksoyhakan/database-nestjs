import { Injectable } from '@nestjs/common';
import { ProductCreateDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { ProductNotFoundException } from 'src/exceptions/product-exceptions/user.notfound.exception';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRespository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
  ) {}

  async activeProducts(): Promise<Product[]> {
    return await this.productRespository.find({ relations: ['user'] });
  }

  async getById(id: number): Promise<Product> {
    try {
      const product = await this.productRespository.findOne({
        where: {
          id,
        },
      });

      if (product) {
        return product;
      } else {
        throw new ProductNotFoundException(id);
      }
    } catch (error) {
      throw new ProductNotFoundException(id);
    }
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
    try {
      const searchProduct = await this.productRespository.findOne({
        where: {
          id,
        },
      });

      if (searchProduct) {
        searchProduct.name = updatedProduct.name;
        return this.productRespository.save(searchProduct);
      } else {
        throw new ProductNotFoundException(id);
      }
    } catch (error) {
      throw new ProductNotFoundException(id);
    }
  }

  async delete(id: number) {
    return this.productRespository.softDelete(id);
  }
}
