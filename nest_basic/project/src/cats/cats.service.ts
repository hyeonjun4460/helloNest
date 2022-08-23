import { CatsRepository } from './cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsService {
  //DB query 작업을 위해, schema 의존성 주입, schema의 타입은 Cat에 따름.
  constructor(private readonly catsRepository: CatsRepository) {}

  getCats(): string {
    return 'hello cats';
  }

  async signup(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email); // 중복 확인하는 mongoose method
    if (isCatExist.success === true) {
      // throw new HttpException('해당하는 고양이는 이미 존재합니다.', 403); 아래와 동일.
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }
    const hashPassword = await bcrypt.hash(password, 10); // bcrypt로 암호화
    const cat = await this.catsRepository.create({ email, name, password: hashPassword });
    return cat.readOnlyDATA; // response 용 readOnlydata를 return해서 보안 지키기
  }
}
