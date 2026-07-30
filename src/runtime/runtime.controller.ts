import { Controller, Get } from '@nestjs/common';
import { RuntimeService } from './runtime.service';

@Controller('runtime')
export class RuntimeController {

    constructor(
        private readonly service: RuntimeService
    ) {}

    @Get()
    status() {
        return this.service.status();
    }

}