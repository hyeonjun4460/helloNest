import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// jwt 생성, 검증 전략
@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //헤더에서 bearer type으로 활용
      secretOrKey: process.env.secretKey, // 시크릿 키(인증용)
      ignoreExpiration: false, // 만료 기간 지난 토큰을 허가하는지 여부
    });
  }
  //   검증 메소드
  //   async validate(payload) {}
}
