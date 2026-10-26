import { Controller, Get } from '@nestjs/common';
import { RequireExecutionKey } from '../../execution-access.guard';
import { IdentityService } from '../identity.service';

@RequireExecutionKey()
@Controller('identity')
export class IdentityController {

  constructor(
    private readonly identityService: IdentityService
  ) {}

  @Get('status')
  status() {
    return this.identityService.loadIdentity();
  }
}