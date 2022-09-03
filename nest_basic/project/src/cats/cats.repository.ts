import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async findCatById(id: string | Types.ObjectId): Promise<Cat | null> {
    return await this.catModel.findOne({ _id: id }).select('-password'); // select = password를 제외하고 출력 == select('email name')
  }

  async findByIdAndUpdateImg(email: string, fileName: string) {
    try {
      const cat = await this.catModel.findOne({ email }); // 유저를 찾고
      cat.imgUrl = `http://localhost:8000/media/${fileName}`; // 유저에게 imgUrl 업데이트
      const newCat = await cat.save(); // cat에 추가된 사항을 저장하는 mongoose query
      console.log(newCat);

      return newCat.readOnlyDATA; // response용 data를 return
    } catch {
      throw new HttpException('db error', 400);
    }
  }

  async findAll() {
    try {
      return await this.catModel.find();
    } catch {
      throw new HttpException('db error', 400);
    }
  }
}
