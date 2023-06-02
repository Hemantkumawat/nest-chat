import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { User } from 'src/modules/mongodb/schemas/user.schema';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('user')
export class UserController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly userService: UserService) { }

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
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1, // Default page number is 1
    @Query('limit', ParseIntPipe) limit: number = 10, // Default limit is 10 items per page
  ): Promise<object | any> {
    // await this.cacheManager.reset();

    const cacheKey = `nest-users-find-all-${page}-${limit}`
    let cacheData = await this.cacheManager.get(cacheKey);
    if (!cacheData) {
      const res = await this.userService.findAll(page, limit);
      const ress = await this.cacheManager.set(cacheKey, JSON.stringify(res))
      return { ...res, ress, cached: false, cachedData: cacheData };
    }
    let res = {};
    cacheData = JSON.parse(cacheData.toString());
    if (typeof cacheData == 'object') {
      res = cacheData;
    }
    return { ...res, cached: true };
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
