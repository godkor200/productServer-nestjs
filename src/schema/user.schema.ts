import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userPwd: string;

  @Prop({ required: true })
  userClass: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  modifiedAt: Date;

  @Prop({ default: true })
  userStatus: boolean;

  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
