import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ResumeService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadResume(userId: string, file: Express.Multer.File) {
    const fileBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(fileBuffer);
    // Optionally, delete the file after processing
    fs.unlinkSync(file.path);

    return this.prisma.resume.create({
      data: {
        id: uuidv4(),
        userId,
        parsedData: data.text,
      },
    });
  }


}
