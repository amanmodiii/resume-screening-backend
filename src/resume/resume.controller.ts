import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from './resume.service';
import { AuthGuard } from '../guards/auth.guard';
import { GetUser } from '../user/decorators/current-user.decorator';
import { Resume, User } from '@prisma/client';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Resume> {
    if (file.mimetype !== 'application/pdf') {
      throw new Error('Only PDF files are allowed!');
    }
    const name = file.originalname;
    console.log(name);
    const resume: Resume = await this.resumeService.uploadResume(
      user.id,
      file,
    );
    return resume;

    //implement parsing logic here
  }
}
