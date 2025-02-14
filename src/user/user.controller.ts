import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUser, RegisterUser, UserRole } from './interfaces/auth.interface';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { GetUser } from './decorators/current-user.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/:role/signup')
  async signup(
    @Param('role') role: UserRole,
    @Body() body: RegisterUser,
  ): Promise<User> {
    return this.authService.signUp(body, role);
  }

  @Get('/login')
  async login(@Body() loginBody: LoginUser) {
    return this.authService.login(loginBody);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async getMe(@GetUser() user: User): Promise<User> {
    return user;
  }
}
