import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
