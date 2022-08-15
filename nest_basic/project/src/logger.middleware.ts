import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // nest는 로깅 시, nest에서 제공하는 Logger class를 이용.
  // res.on('finish') => respsonse가 완료된 이후에 로깅 실행
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(
        `${req.originalUrl} ${req.method}, ${res.statusCode} : ${req.ip}`,
      );
    });
    next();
  }
}
