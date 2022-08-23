import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {} // schema를 상속받아서, Dto 코드 작성 시 하드코딩 축소 = 코드 재사용성 증가
