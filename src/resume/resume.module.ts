import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    MulterModule.register({
      dest: './uploads', // Directory to store uploaded PDFs
    }),
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
