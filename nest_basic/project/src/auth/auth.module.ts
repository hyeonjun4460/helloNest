import { CatsModule } from './../cats/cats.module';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }), // Passport 전략에 대한 커스텀. jwt default, session-cookie 사용 X
    JwtModule.register({
      // jwt 토큰 생성용 모듈, 이게 있어야 jwtService를 의존성 주입 가능
      secret: process.env.secretKey,
      signOptions: { expiresIn: '60s' }, // 만료기간
    }),
    forwardRef(() => CatsModule), // 역할과 책임을 분명하게 하기 위해, CatsRepository는 auth의 provider가 아니라 catsmodule로 import해서 사용
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
