import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import * as dotenv from 'dotenv';
import MongoDBModule from './modules/mongodb/mongodb.module';
dotenv.config();

@Module({
  imports: [UserModule, MongoDBModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('AppModule');
  }
}
