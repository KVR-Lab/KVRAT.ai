import { Body, Controller, Post } from '@nestjs/common';
import { RequireExecutionKey } from '../execution-access.guard';
import { VaultService } from '../vault/vault.service';


@RequireExecutionKey()
@Controller('security/vault')
export class VaultController {


  constructor(
    private readonly vault: VaultService
  ) {}


  @Post('import')
  importSecret(
    @Body() body: {
      source:string;
      name:string;
    }
  ){

    return this.vault.encryptFile(
      body.source,
      body.name
    );

  }

}