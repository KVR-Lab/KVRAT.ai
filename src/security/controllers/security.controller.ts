import { Controller, Get } from '@nestjs/common';
import { RequireExecutionKey } from '../execution-access.guard';
import { SecretScanner } from '../scanner/secret.scanner';

@RequireExecutionKey()
@Controller('security')
export class SecurityController {

  constructor(
    private readonly scanner: SecretScanner
  ) {}

  @Get('scan')
  scan() {

    return {
      system: 'KVR',
      scan: 'complete',
      found: this.scanner.scan('D:\\')
    };

  }

}