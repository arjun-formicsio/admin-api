import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/roles.enum';

export type UserDocument = User & Document;
@Schema()
export class User {

  @Prop()
  username: string;

  @Prop({ length: 50 })
  password: string;

  @Prop()
  email: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  age: number;

  @Prop()
  mobile: string;

  @Prop({ default: '' })
  img: string;

  @Prop({ type: String, enum: Role })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
