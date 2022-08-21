import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './logger.middleware';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI), CatsModule], // mongo DB 연결
  controllers: [AppController],
  providers: [AppService],
})
// middleware 적용
// implements: NestModule의 interface에 충족하도록 제한
// forRoutes는 미들웨어를 바인딩시키는 라우터. '*'를 입력하면 전체 라우터에 바인딩.
// consumer는 미들웨어를 제공하는 대상
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false; // MODE가 dev이면 true 아니면 false
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', this.isDev); // mongoose 실행 시 query 로그 실행
  }
}
