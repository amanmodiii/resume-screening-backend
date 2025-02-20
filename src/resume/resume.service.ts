import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
// import { mockData } from './mock-data';
import axios from 'axios';

@Injectable()
export class ResumeService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadResume(userId: string, file: Express.Multer.File) {
    const name = file.originalname;
    //const data = JSON.parse(mockData);

    const fileBuffer = fs.readFileSync(file.path);
    const formData = new FormData();
    const fileBlob = new Blob([fileBuffer], { type: file.mimetype });
    formData.append('resume', fileBlob, file.originalname);
    const response = await axios.post('http://localhost:5000', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response) {
      console.log('NLP model ran successfully');
    }
    const data = response.data;

    // Optionally, delete the file after processing
    fs.unlink(file.path, (err) => {
      if (err) {
      console.error('Error deleting the file:', err);
      } else {
      console.log('File deleted successfully');
      }
    });

    return this.prisma.resume.create({
      data: {
        id: uuidv4(),
        name,
        userId,
        parsedData: data as any,
      },
    });
  }

  async getResumes(userId: string) {
    return this.prisma.resume.findMany({
      where: {
        userId,
      },
    });
  }

  async getResumeById(resumeId: string) {
    return this.prisma.resume.findFirst({
      where: {
        id: resumeId
      },
    });
  }
}
