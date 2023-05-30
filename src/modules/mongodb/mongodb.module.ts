import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-app'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export default class MongoDBModule {
  constructor() {
    console.log('MongoDBModule');
  }
}
