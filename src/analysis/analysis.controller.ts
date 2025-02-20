import { Body, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AnalysisService } from './analysis.service';
import { JobService } from '../job/job.service';
import { JobDescriptionBody } from './interfaces/analysis.interface';

@Controller('analysis')
export class AnalysisController {
  constructor(
    private readonly jobService: JobService,
    private readonly analysisService: AnalysisService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAnalysis(
    @Query('resumeId') resumeId: string,
    @Query('jobId') jobId: string,
    @Body() body: JobDescriptionBody,
  ) {
    // create a string for JD
    let jobDescription : string = "";
    if(jobId != null) {
        const job = await this.jobService.findJobById(jobId);
        jobDescription = JSON.stringify(job);
    } else {
        jobDescription = body.jd;
    }
    // console.log(jobDescription);

    return this.analysisService.getAnalysis(resumeId, jobDescription);
  }
}
