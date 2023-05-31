import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from '../user/services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: '647608eb68250d33765bd83d',
            signOptions: { expiresIn: '1h' }, // Adjust the token expiration time as per your requirements
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [AuthService, JwtStrategy, UserService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
    constructor() {
        console.log('AuthModule');
    }
}
