import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'; // 클래스 벨리데이터, 클래스에 삽입되는 멤버변수들의 validation.
import { ApiProperty } from '@nestjs/swagger';
import { Comments } from 'src/comments/comments.schema';
// 스키마와 관련된 옵션
const options: SchemaOptions = {
  timestamps: true, // DB에서 스키마 생성 시 일자를 출력
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    // swagger에서 각 값에 대한 설명 추가
    example: 'example@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    //스키마에 들어가는 각 데이터들의 옵션 설정
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'hello',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'asdqwe',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'imgUrl',
    description: 'email',
    required: true,
  })
  @Prop({
    default: `http://localhost:8000/media/cats/chickenCharacter1661694642810.png`, // default 값 설정
  })
  @IsString()
  imgUrl: string;

  // readonly data에 댓글 document 정보를 연동
  readonly readOnlyDATA: { email: string; name: string; imgUrl: string; comments: Comments[] }; // response용으로 생성한 virtudalData를 class의 readonly 변수로 지정.
  readonly comments: Comments[];
}

// virutal field를 이용해서 클라이언트 단에 보여줘야하는 데이터만 따로 field로 생성

export const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyDATA').get(function (this: Cat) {
  return {
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    _id: this._id, // 기본 이미지 추가에 따라서, RESPONSE용 데이터에 이미지 추가
    comments: this.comments,
  };
});

// 고양이 조회시, 고양이에 대한 comments 데이터를 comments document에서 연동
_CatSchema.virtual('comments', {
  // 연동되는 스키마와 식별자를 지정
  // cats의 _id === comments의 info를 엮음.
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
