import { CatsService } from './cats.service';
import { Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor) // success interceptor 의존성 주입
@UseFilters(HttpExceptionFilter) // exception filter 의존성 주입
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCats() {
    console.log('get all cats');
    // nest에서 예외 에러 발생에 활용되는 인터페아스: HttpException = new Error()
    // 에러는 오버라이딩 해서 커스텀할 수 있음.
    // 예외처리는 모든 컨트롤러에 적는 것이 아니라, 예외처리 미들웨어를 생성하여 일괄적으로 처리하게 함. => 코드 재사용성 up
    return { cats: 'all cats' };
  }

  // Pipe : 클라이언트에서 요청으로 들어온 데이터를 유효성 검사 및 변환을 수행하여 서버가 원하는 데이터를 얻도록 도와주는 클래스
  // nest의 pipe 개념은 pipe 패턴에 영감을 받은 것임. pipe 패턴은 함수형 프로그래밍의 원리에 따른 패턴으로, 각각의 기능들의 의존성이 낮고 독립성이 높음.
  // nest는 특정 타입변환validation을 수행하는 각각의 기능들 하나하나를 파이프라고 간주.
  // 타입변환/validation 목적으로 사용됨.(:id에서 number로 변환이 안되는 데이터는 에러처리함.)
  // 여러 타입에 걸쳐서 Pipe는 이용할 수 있음.

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) param) {
    console.log(param);
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
