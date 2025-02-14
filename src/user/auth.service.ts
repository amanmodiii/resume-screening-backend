import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  LoginUser,
  RegisterUser,
  UserRole,
} from './interfaces/auth.interface';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: RegisterUser, role: UserRole) {
    try {
      // Check if email already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: body.email },
      });
      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }

      const hashedPassword = await bcrypt.hash(body.password, 10);
      const user = await this.prisma.user.create({
        data: {
          id: uuidv4(),
          name: body.name,
          email: body.email,
          password: hashedPassword,
          role: role,
          bio: body.bio,
          portfolioUrl: body.portfolioUrl,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async login({ email, password }: LoginUser) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }

      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      // Catch any errors during login
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error; // Rethrow known errors
      }
      throw new InternalServerErrorException(
        'Login failed due to an unexpected error',
      );
    }
  }

  async validateToken(token: string): Promise<User> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
