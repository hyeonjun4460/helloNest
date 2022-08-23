import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<{ success: boolean; data?: Omit<Cat, 'imgUrl' | 'readOnlyDATA'> }> {
    // promise가 reslolve 된 이후에 boolean 타입이어야한다는 의미
    try {
      const result = await this.catModel.exists({ email });
      if (result) {
        const data = await this.catModel.findOne({ _id: result._id });
        return { success: true, data };
      } else {
        return { success: false };
      }
      //   return result;
    } catch {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    // Promise로 resolve된 값이 cat 타입이어야 함.
    return await this.catModel.create(cat);
  }
}
