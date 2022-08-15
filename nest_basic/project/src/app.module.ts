import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
// middleware 적용
// implements: NestModule의 interface에 충족하도록 제한
// forRoutes는 미들웨어를 바인딩시키는 라우터. '*'를 입력하면 전체 라우터에 바인딩.
// consumer는 미들웨어를 제공하는 대상
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
