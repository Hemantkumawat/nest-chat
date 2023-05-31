import { Injectable, UnauthorizedException, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';
import { UserService } from '../user/services/user.service';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../user/dtos/user.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(emailOrPhone: string, password: string): Promise<User> {
        const user = await this.userService.findUserByEmailOrPhone(emailOrPhone);
        if (user && (await this.userService.comparePassword(password, user.password))) {
            return user;
        }
        return null;
    }

    async login(loginData: LoginDto): Promise<{ accessToken: string, user: User }> {
        const { emailOrPhone, password } = loginData;
        const user = await this.validateUser(emailOrPhone, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id };

        return {
            accessToken: this.jwtService.sign(payload),
            user: user
        };
    }

    async validateUserById(userId: string): Promise<User> {
        return this.userService.findById(userId);
    }

    async register(registerData: UserDto): Promise<{ accessToken: string, user: User }> {
        const { email, phoneNumber, password } = registerData;

        const existEmail = await this.userService.findUserByEmailOrPhone(email);
        const existPhone = await this.userService.findUserByEmailOrPhone(phoneNumber);
        if (existEmail) {
            throw new BadRequestException('User with provided phonNumber already exists');
        }
        if (existPhone) {
            throw new BadRequestException('User with provided phonNumber already exists');
        }

        const user = await this.userService.add(registerData);

        const payload = { sub: user.id };

        return {
            accessToken: this.jwtService.sign(payload),
            user: user
        };
    }
}
