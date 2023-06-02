import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User extends mongoose.Document {
  @Prop({ required: true })
  @IsNotEmpty()
  firstName: string;

  @Prop({ required: true })
  @IsNotEmpty()
  lastName: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true, unique: true })
  @IsPhoneNumber()
  phoneNumber: string;

  @Prop({ required: true })
  @Length(2)
  countryCode: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
