import { CatsService } from './cats.service';
import { Controller, Delete, Get, HttpException, Patch, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @UseFilters(HttpExceptionFilter)
  getCats(): string {
    // nest에서 예외 에러 발생에 활용되는 인터페아스: HttpException = new Error()
    // 에러는 오버라이딩 해서 커스텀할 수 있음.
    // 예외처리는 모든 컨트롤러에 적는 것이 아니라, 예외처리 미들웨어를 생성하여 일괄적으로 처리하게 함. => 코드 재사용성 up
    throw new HttpException('api is broken', 401);
    return this.catsService.getCats();
  }

  @Post()
  creatCat() {
    return 'post cat';
  }

  @Patch()
  updateCat() {
    return 'update cat';
  }

  @Delete()
  deleteCat() {
    return 'delete cat';
  }
}
