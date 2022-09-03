import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString, IsPositive } from 'class-validator'; // 클래스 벨리데이터, 클래스에 삽입되는 멤버변수들의 validation.
import { ApiProperty } from '@nestjs/swagger';
// 스키마와 관련된 옵션
const options: SchemaOptions = {
  timestamps: true, // DB에서 스키마 생성 시 일자를 출력
};

@Schema(options)
export class Comments extends Document {
  // 작성자
  @ApiProperty({
    // swagger에서 각 값에 대한 설명 추가
    description: '작성자 이름',
    required: true,
  })
  @Prop({
    //스키마에 들어가는 각 데이터들의 옵션 설정
    type: Types.ObjectId, // ObjectId의 타입. mongoose에서 string으로 변환해주기는 함.
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  //   댓글 대상
  @ApiProperty({
    description: '댓글 대상',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats',
  })
  @IsNotEmpty()
  info: Types.ObjectId;

  //   내용
  @ApiProperty({
    description: '내용',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  //   좋아요
  @ApiProperty({
    description: '좋아요',
  })
  @Prop({
    default: 0,
  })
  @IsNotEmpty()
  @IsPositive()
  likeCount: number;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments); // 스키마 생성
