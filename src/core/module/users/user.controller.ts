import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async addUsers(
    @Body('email') userEmail: string,
    @Body('password') userPass: string,
  ) {
    try {
      const user = await this.userService.store(userEmail, userPass);
      return { user, message: 'An Email sent to your account please verify' };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  @Get('/verify/:id/:token')
  verifyUser(@Param('id') userId: number, @Param('token') userToken: string) {
    try {
      this.userService.verify(userId, userToken);
      return { message: 'email verified successfully' };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
