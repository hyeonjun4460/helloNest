import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class-validator 등록

  app.useGlobalFilters(new HttpExceptionFilter()); // httpException filter 등록

  // swagger 접근에 권한 계정/비밀번호 제한
  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.swaggerUser]: process.env.swaggerPassword,
      },
    }),
  );
  const config = new DocumentBuilder().setTitle('Cats example').setDescription('The cats API description').setVersion('1.0').addTag('cats').build(); // swagger 세팅
  const document = SwaggerModule.createDocument(app, config); // swagger 세팅
  SwaggerModule.setup('docs', app, document); // swagger 세팅

  app.enableCors({
    origin: true, // true = 어느 곳에서나 접근 가능, true 이외에 본래는 url을 작성
    credentials: true,
  });
  await app.listen(process.env.PORT);
}
bootstrap();
