import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); // pre-controller 컨트롤러 진입 전에 실행, 로직 실행 후에는 컨트롤러로 진입

    // post controller 컨트롤러 로직 실행 종료 후에 컨트롤러의 return 값을 data라는 paramater 값으로 받아서 실행됨
    // post controller에서 return된 값은 앤드포인트의 response로 전달됨.
    // response 형식을 일관적으로 관리하는 목적으로 사용될 수 있음.
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    ); // post-controller 현재 이 코드는 에러가 날 경우에는 실행되지 않음!
  }
}
