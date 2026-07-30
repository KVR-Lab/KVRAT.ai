import { Controller, Get } from '@nestjs/common';

@Controller('projects')
export class ProjectRuntimeController {

  @Get('status')
  status() {
    console.log('>>> PROJECT STATUS CALLED <<<');

    return {
      ok: true,
      message: 'Project Runtime Works',
      time: new Date().toISOString(),
    };
  }
}