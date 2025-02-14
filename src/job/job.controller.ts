import { Body, Controller, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { GetUser } from '../user/decorators/current-user.decorator';
import { Job, User } from '@prisma/client';
import { JobService } from './job.service';
import { CreateJob, jobQuery } from './interfaces/job.interface';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('jobs')
export class JobController {
    constructor(
        private readonly jobService: JobService
    ) {}

    @UseGuards(AdminGuard)
    @Post()
    async createJob(
        @Body() body: CreateJob,
        @GetUser() user: User
    ): Promise<Job> {
        const job : Job = await this.jobService.uploadJob(body, user.id);

        return job;
    }

    @UseGuards(AuthGuard)
    @Get()
    async getJobs(@Query() query: jobQuery): Promise<Job[]> {
        const jobs : Job[] = await this.jobService.getJobs(query);

        return jobs;
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getJob(@Param('id') id: string): Promise<Job | null> {
        const job = await this.jobService.findJobById(id);
        if(!job) {
            throw new NotFoundException('Job not found');
        }
        return job;
    }
}
