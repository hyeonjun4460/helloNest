import { CatsService } from './cats.service';
import { Body, Controller, Get, HttpException, Param, ParseIntPipe, Patch, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor) // success interceptor 의존성 주입
@UseFilters(HttpExceptionFilter) // exception filter 의존성 주입
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp(@Body() body) {
    console.log(body);
    return 'signup';
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
