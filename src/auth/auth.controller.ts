import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUser, RegisterApplicant, RegisterRecruiter } from './interfaces/auth.interface';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register/applicant')
  async registerApplicant(@Body() body: RegisterApplicant): Promise<User> {
    return this.authService.registerApplicant(body);
  }

  @Post('register/recruiter')
  async registerRecruiter(@Body() body: RegisterRecruiter): Promise<User> {
    return this.authService.registerRecruiter(body);
  }

  @Get('login')
  async login(@Body() loginBody: LoginUser) {
    return this.authService.login(loginBody);
  }
}
