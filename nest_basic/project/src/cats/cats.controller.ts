import { AuthService } from './../auth/auth.service';
import { CatsService } from './cats.service';
import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cats.response.dto';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor) // success interceptor 의존성 주입
@UseFilters(HttpExceptionFilter) // exception filter 의존성 주입
export class CatsController {
  constructor(private readonly catsService: CatsService, private readonly authService: AuthService) {} // cat service 의존성 주입

  @ApiOperation({ summary: '전체 조회' })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiOperation({ summary: '회원가입' }) //swagger에서 api summary
  @ApiResponse({ status: 500, description: 'Server error' }) // swagger에서  response 케이스 표출
  @ApiResponse({ status: 200, description: 'success', type: ReadOnlyCatDto }) // swagger에서  response 케이스 표출
  @Post()
  // DTO(Data Transfer Object): 계층 간 데이터 교환을 위한 데이터 규격을 의미하는 객체
  // request를 받고, 각 계층 간 통신 시 데이터의  validation을 위해 이용된다.
  async signup(@Body() body: CatRequestDto) {
    // body는 @nestjs/swagger에서 인식하여 보여준다.
    return await this.catsService.signup(body);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('login')
  login(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogIn(body);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logout() {
    return 'logout';
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @Post('upload/cat')
  uploadCatImg() {
    return 'upload img';
  }
}
