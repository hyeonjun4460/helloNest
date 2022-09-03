import { CommentsRepository } from './comments.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from 'src/cats/cats.module';
import { CommentsController } from './comments.controller';
import { Comments, CommentsSchema } from './comments.schema';
import { CommentsService } from './comments.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [CatsModule, MongooseModule.forFeature([{ name: Comments.name, schema: CommentsSchema }]), AuthModule], // DB Query 작업을 위해, schema import | Authmodule 순환참조
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
