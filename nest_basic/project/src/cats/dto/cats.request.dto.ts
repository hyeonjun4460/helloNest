import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
// type, interface가 아니라 class로 DTO를 생성하는 이유
// 1. decoration 패턴 사용 위함(class validator 이용)
// 2. 상속을 통해 코드 재사용성을 늘리기 위함.
export class CatRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
