import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'; // 클래스 벨리데이터, 클래스에 삽입되는 멤버변수들의 validation.
// 스키마와 관련된 옵션
const options: SchemaOptions = {
  timestamps: true, // DB에서 스키마 생성 시 일자를 출력
};

@Schema(options)
export class Cat extends Document {
  @Prop({
    //스키마에 들어가는 각 데이터들의 옵션 설정
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyDATA: { email: string; name: string }; // response용으로 생성한 virtudalData를 class의 readonly 변수로 지정.
}

// virutal field를 이용해서 클라이언트 단에 보여줘야하는 데이터만 따로 field로 생성

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyDATA').get(function (this: Cat) {
  return {
    email: this.email,
    name: this.name,
  };
});
