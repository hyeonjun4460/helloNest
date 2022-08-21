import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

// 스키마와 관련된 옵션
const options: SchemaOptions = {
  timestamps: true, // DB에서 스키마 생성 시 일자를 출력
};

@Schema(options)
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  imgUrl: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
