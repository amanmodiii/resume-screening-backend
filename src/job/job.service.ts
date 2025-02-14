import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJob, jobQuery } from './interfaces/job.interface';
import { Job } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async uploadJob(body: CreateJob, userId: string) : Promise<Job> {
        const job = await this.prisma.job.create({
            data: {
                id: uuidv4(),
                title: body.title,
                description: body.description,
                requiredSkills: body.requiredSkills,
                experience: body.experience ?? 0,
                location: body.location,
                salaryRange: body.salaryRange,
                jobType: body.jobType,
                createdBy: userId
            }
        })
        return job;
    }

    async getJobs(query: jobQuery) : Promise<Job[]> {
        const whereClause: any = {
          title: query.title,
          experience: (query.experience),
          location: query.location,
          salaryRange: query.salaryRange,
          jobType: query.jobType,
        };

        if (query.requiredSkills && query.requiredSkills.length > 0) {
          whereClause.requiredSkills = {
            hasSome: query.requiredSkills,
          };
        }

        const jobs = await this.prisma.job.findMany({
          where: whereClause,
        });

        return jobs;
    }

    async findJobById(id: string) : Promise<Job | null> {
        const job = await this.prisma.job.findUnique({
            where: {
                id: id
            }
        });

        return job;
    }
}
