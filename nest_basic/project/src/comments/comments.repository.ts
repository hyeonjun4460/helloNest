import { BadRequestException, HttpException } from '@nestjs/common';
import { CatsRepository } from './../cats/cats.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comments } from './comments.schema';
import { CommentsRequestDto } from './dto/comments.request.dto';
import { error } from 'console';
import * as mongoose from 'mongoose';

export class CommentsRepository {
  constructor(@InjectModel(Comments.name) private readonly commentModel: Model<Comments>, private readonly catsRepository: CatsRepository) {}

  async createComment(id: string, user: { email: string; name: string; imgUrl: string; _id: Types.ObjectId }, comments: CommentsRequestDto) {
    try {
      return await this.commentModel.create({ author: user._id, content: comments.content, info: mongoose.Types.ObjectId(id) });
    } catch {
      throw new BadRequestException(error);
    }
  }

  async getAllComments() {
    try {
      return this.commentModel.find();
    } catch {
      throw new HttpException('db error', 400);
    }
  }

  async addLike(id: string) {
    try {
      const comment = await this.commentModel.findOne({ _id: id });
      comment.likeCount += 1;
      return await comment.save();
    } catch {
      throw new BadRequestException(error);
    }
  }
}
