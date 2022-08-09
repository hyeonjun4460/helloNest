import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller() // 데코레이터 패턴, () 안에는 path가 들어갈 수 있다. 코드 재사용성을 위해 사용되는 것이다
export class AppController {
  constructor(private readonly appService: AppService) {} // controller에 service 의존성 주입

  @Get('/:id')
  getHello(@Req() req: Request, @Body() body, @Param() param): string {
    // express는 req 안 객체에서 뽑아서 썻지만, nest는 body, param 등 각자의 역할/책임을 분명하게 하기 위해 나눠둠.
    // body, pararm은 DTO body에 validation을 줄 수 있음..
    console.log(body);
    console.log(param);
    return this.appService.getHello();
  }
}
