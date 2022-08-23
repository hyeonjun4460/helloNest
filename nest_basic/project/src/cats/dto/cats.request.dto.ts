import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';
// type, interface가 아니라 class로 DTO를 생성하는 이유
// 1. decoration 패턴 사용 위함(class validator 이용)
// 2. 상속을 통해 코드 재사용성을 늘리기 위함.
export class CatRequestDto extends PickType(Cat, ['email', 'name', 'password'] as const) {} // schema를 상속받아서, Dto 코드 작성 시 하드코딩 축소 = 코드 재사용성 증가
