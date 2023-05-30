import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { User } from 'src/modules/mongodb/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  create(@Body() user: UserDto): Promise<User> {
    return this.userService.add(user);
  }

  @Put('/')
  update(@Body() user: UserDto): Promise<User> {
    return this.userService.update(user);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

  @Get('/')
  findAll(@Query() query: object): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
