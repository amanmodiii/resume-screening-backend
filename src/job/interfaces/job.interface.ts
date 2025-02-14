export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  REMOTE = 'REMOTE',
  INTERNSHIP = 'INTERNSHIP',
  CONTRACT = 'CONTRACT',
}

export interface CreateJob {
  title: string;
  description: string;
  requiredSkills: string[];
  experience?: number;
  location?: string;
  salaryRange?: string;
  jobType: JobType;
}

export interface jobQuery {
  title?: string;
  requiredSkills?: string[];
  experience?: number;
  location?: string;
  salaryRange?: string;
  jobType?: JobType;
}
