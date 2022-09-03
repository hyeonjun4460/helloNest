import { Types } from 'mongoose';
import { ReadOnlyCatDto } from './../cats/dto/cats.response.dto';
import { CommentsRequestDto } from './dto/comments.request.dto';
import { Injectable, Type } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { Cat } from 'src/cats/cats.schema';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async getAllComments() {
    return this.commentsRepository.getAllComments();
  }

  async createComment(id: string, user: { email: string; name: string; imgUrl: string; _id: Types.ObjectId }, comments: CommentsRequestDto) {
    return this.commentsRepository.createComment(id, user, comments);
  }

  async addLike(id: string) {
    return this.commentsRepository.addLike(id);
  }
}
