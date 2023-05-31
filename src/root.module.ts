import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import MongoDBModule from './modules/mongodb/mongodb.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, MongoDBModule, AuthModule,ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('AppModule');
  }
}
