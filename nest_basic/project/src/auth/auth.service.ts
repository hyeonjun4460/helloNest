import { CatsRepository } from './../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly catsRepository: CatsRepository, private jwtService: JwtService) {} // 로그인 시 request로 받아온 것이 모든 유효성 검증을 마쳤을 때에 유효성 검증이 들어가야하므로, catsrepository를 의존성 주입

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    const cat = await this.catsRepository.existsByEmail(email);
    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(password, cat.data.password);
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }
    const payload = { email, id: cat.data._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
