import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { User } from 'src/modules/mongodb/schemas/user.schema';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  create(@Body() user: UserDto): Promise<User> {
    return this.userService.add(user);
  }

  @Put('/')
  @UseGuards(JwtAuthGuard)
  update(@Body() user: UserDto): Promise<User> {
    return this.userService.update(user);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: object): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
