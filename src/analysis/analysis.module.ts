import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { UserModule } from '../user/user.module';
import { JobModule } from 'src/job/job.module';
import { ResumeModule } from 'src/resume/resume.module';

@Module({
  imports: [UserModule, JobModule, ResumeModule],
  controllers: [AnalysisController],
  providers: [AnalysisService]
})
export class AnalysisModule {}
