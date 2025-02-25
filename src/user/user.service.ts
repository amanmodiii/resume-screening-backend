import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) {}

  async getUserByEmail(email: string) : Promise<User | null> {
    const user =  await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }
}
