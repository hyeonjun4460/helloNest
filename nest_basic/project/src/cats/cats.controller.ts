import { CatsService } from './cats.service';
import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor) // success interceptor 의존성 주입
@UseFilters(HttpExceptionFilter) // exception filter 의존성 주입
export class CatsController {
  constructor(private readonly catsService: CatsService) {} // cat service 의존성 주입

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  // DTO(Data Transfer Object): 계층 간 데이터 교환을 위한 데이터 규격을 의미하는 객체
  // request를 받고, 각 계층 간 통신 시 데이터의  validation을 위해 이용된다.
  async signup(@Body() body: CatRequestDto) {
    return await this.catsService.signup(body);
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @Post('upload/cat')
  uploadCatImg() {
    return 'upload img';
  }
}
