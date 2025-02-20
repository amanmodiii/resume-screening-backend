import { Injectable } from '@nestjs/common';
import { ResumeService } from '../resume/resume.service';
import axios from 'axios';

@Injectable()
export class AnalysisService {
    constructor(
        private readonly resumeService: ResumeService,
    ) {}

    async getAnalysis(resumeId: string, jobDescription: string) {
        const resume = await this.resumeService.getResumeById(resumeId);

        // console.log(resume?.parsedData);

        const analysisReport = await axios.post(
          'http://localhost:5000/match',
          {
            resume_data: resume?.parsedData,
            job_description: jobDescription,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        return {
            matching_score: analysisReport.data.matching_score,
            matching_analysis: analysisReport.data.match_analysis,
        };

        // return analysisReport.data;
    }
}
