import { HttpExceptionFilter } from './../common/exception/http-exception.filter';
import { CommentsRequestDto } from './dto/comments.request.dto';
import { Body, Controller, Get, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { jwtGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { User } from 'src/common/decorator/user.decorator';

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  async getAllComments() {
    return await this.commentsService.getAllComments();
  }

  @UseGuards(jwtGuard)
  @Post('/:id')
  async createComment(@Param('id') id: string, @Body() body: CommentsRequestDto, @User() cat) {
    return await this.commentsService.createComment(id, cat, body);
  }
}
