import { CatsService } from './cats.service';
import { Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UseFilters } from '@nestjs/common';
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

  // Pipe
  // 컨트롤러 라우트 핸들러로 주로 사용됨.
  // 타입변환/validation 목적으로 사용됨.(:id에서 number로 변환이 안되는 데이터는 에러처리함.)
  // 여러 타입에 걸쳐서 Pipe는 이용할 수 있음.
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) param) {
    return 'get one cat api';
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
