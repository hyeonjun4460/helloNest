import { AuthService } from './../auth/auth.service';
import { CatsService } from './cats.service';
import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, Req, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cats.response.dto';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { jwtGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { User } from 'src/common/decorator/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { Cat } from './cats.schema';

@Controller('cats')
@UseInterceptors(SuccessInterceptor) // success interceptor 의존성 주입
@UseFilters(HttpExceptionFilter) // exception filter 의존성 주입
export class CatsController {
  constructor(private readonly catsService: CatsService, private readonly authService: AuthService) {} // cat service 의존성 주입

  @ApiOperation({ summary: '현재 고양이 조회' })
  @UseGuards(jwtGuard) // jwt guard를 실행
  @Get()
  getCurrentCat(
    @User() cat, //custom decoration으로 만든 파라메터 common -> decorator에서 확인 가능
  ) {
    return cat; // guard를 통과해서 할당받은 값.
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

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogIn(body);
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats'))) // image라는 키에 들어온 파일을 + 최대 10개 제한으로 +  cats라는 폴더에 저장, 저장된 폴더/파일은 dist 폴더에서 확인 가능
  @UseGuards(jwtGuard) // jwt guard를 실행
  @Post('upload')
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>, @User() cat: Cat) {
    console.log(files);
    return this.catsService.uploadImg(cat, files);
  }
}
