import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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

  // 서버에 이미지 파일을 저장 시키고, 그 정적 파일의 주소들을 클라이언트에 서빙하기 위한 정적파일 관리용 미들웨어
  // 사용하기 위해서는 nest가 컴파일 될 프레임워크가 express인지 fastify인지를 명확히 해야하므로, 위에서 <NestExpressApplication>을 타입을 명시함
  // prefix: __dirname, ./common, uploads를 prefix에 할당된 값으로 치환
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), { prefix: '/media' });
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
