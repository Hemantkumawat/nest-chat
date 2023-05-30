/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import {} from 'uuid';
import { randomUUID } from 'crypto';
import { User, UserDocument } from 'src/modules/mongodb/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  add(user: UserDto): Promise<User> {
    user.id =randomUUID();
    const createdUser = new this.userModel(user);
    return createdUser.save();
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
}
