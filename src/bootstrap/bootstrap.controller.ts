import { Controller, Get } from '@nestjs/common';
import { RequireExecutionKey } from '../security/execution-access.guard';
import { BootstrapService } from './bootstrap.service';

@RequireExecutionKey()
@Controller('bootstrap')
export class BootstrapController {

    constructor(
        private readonly bootstrapService: BootstrapService,
    ) {}

    @Get()
    run() {
        return this.bootstrapService.boot();
    }

}
