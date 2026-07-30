import { Controller, Get } from '@nestjs/common';
import { SecretScanner } from '../scanner/secret.scanner';

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