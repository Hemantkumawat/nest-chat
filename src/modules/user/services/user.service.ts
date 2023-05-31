/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import {} from 'uuid';
import { randomUUID } from 'crypto';
import { User } from 'src/modules/mongodb/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async add(registerUserData: UserDto): Promise<User> {
    const existEmail = await this.findUserByEmailOrPhone(registerUserData.email);
    const existPhone = await this.findUserByEmailOrPhone(registerUserData.phoneNumber);
    if (existEmail) {
      throw new BadRequestException('User with provided phonNumber already exists');
    }
    if (existPhone) {
      throw new BadRequestException('User with provided phonNumber already exists');
    }

    const hashedPassword = await bcrypt.hash(registerUserData.password, 10);
    const user = new this.userModel({
      ...registerUserData,
      password: hashedPassword,
    });

    return user.save();
  }
  
  update(user: UserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(user.id, user, { new: true }).exec();
  }
  
  delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }
  
  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
  
  async findAll(query:object): Promise<User[]> {
    console.log('Query:: ',query)
    return this.userModel.find().exec();
  }

  async findUserByEmailOrPhone(emailOrPhone: string): Promise<User> {
    return this.userModel.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password.toString(), hashedPassword);
  }
}
