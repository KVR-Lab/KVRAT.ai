import { Controller, Get } from '@nestjs/common';
import { BuildService } from './build.service';

@Controller('build')
export class BuildController {

  constructor(private readonly service: BuildService) {}

  @Get()
  status() {
    return this.service.status();
  }

}
