import { Controller, Get, Body, Patch, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async findMe(@Request() req: any) {
    const user = await this.usersService.findOne(req.user);
    return this.excludeSensitiveFields(user);
  }

  @Patch('me')
  async updateMe(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(req.user, updateUserDto);
  }

  private excludeSensitiveFields(user: any) {
    if (user) {
      delete user.password;
      delete user.id
      // delete other sensitive fields if any
    }
    return user;
  }

}
