import { Cat, CatSchema } from './cats.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';

// nest는 모든 구조가 "모듈"로 되어 있다.
// 모듈은 controller(요청/응답 처리) + provider(비즈니스로직)로 구성된다.
// 각 모듈은 기본적으로 은닉되어 "캡슐화"되어 있다.
//  exports를 이용하면 다른 모듈에서 현재 모듈의 특정 기능을 사용할 수 있다.
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]),
    forwardRef(() => AuthModule),
    MulterModule.register({
      dest: './upload', // 저장 위치
    }),
  ], // DB Query 작업을 위해, schema import | Authmodule 순환참조
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository], // repository는 캡슐화 되어 있으므로, 다른 모듈에서 사용하게 하기 위해, 별도로 exports
})
export class CatsModule {}
