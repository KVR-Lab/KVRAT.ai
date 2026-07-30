import { Controller, Get } from '@nestjs/common';
import { VisionService } from './vision.service';

@Controller('vision')
export class VisionController {

    constructor(
        private readonly service: VisionService
    ) {}

    @Get()
    status() {
        return this.service.status();
    }

}