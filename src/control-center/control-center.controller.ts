import { Controller, Get } from '@nestjs/common';
import { ControlCenterService } from './control-center.service';

@Controller('control-center')
export class ControlCenterController {
  constructor(
    private readonly controlCenterService: ControlCenterService,
  ) {}

  @Get()
  getStatus() {
    return this.controlCenterService.getStatus();
  }
}