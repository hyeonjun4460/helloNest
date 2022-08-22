import { Cat, CatSchema } from './cats.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// nest는 모든 구조가 "모듈"로 되어 있다.
// 모듈은 controller(요청/응답 처리) + provider(비즈니스로직)로 구성된다.
// 각 모듈은 기본적으로 은닉되어 "캡슐화"되어 있다.
//  exports를 이용하면 다른 모듈에서 현재 모듈의 특정 기능을 사용할 수 있다.
@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])], // DB Query 작업을 위해, schema import
  controllers: [CatsController],
  providers: [CatsService], //
  exports: [CatsService],
})
export class CatsModule {}
