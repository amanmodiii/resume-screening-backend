import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { mockData } from './mock-data';

@Injectable()
export class ResumeService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadResume(userId: string, file: Express.Multer.File) {
    const fileBuffer = fs.readFileSync(file.path);

    const name = file.originalname;
    // const data = await pdfParse(fileBuffer);
    const data = JSON.parse(mockData);
    // Optionally, delete the file after processing
    fs.unlinkSync(file.path);

    return this.prisma.resume.create({
      data: {
        id: uuidv4(),
        name,
        userId,
        parsedData: data,
      },
    });
  }
}
