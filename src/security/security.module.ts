import { Module } from '@nestjs/common';

import { IdentityModule } from './identity/identity.module';
import { VaultModule } from './vault/vault.module';
import { ScannerModule } from './scanner/scanner.module';
import { VaultController } from './controllers/vault.controller';

import { SecurityController } from './controllers/security.controller';

@Module({
  imports: [
    IdentityModule,
    VaultModule,
    ScannerModule
  ],

  controllers: [
    SecurityController,
    VaultController
  ],

  exports: [
    IdentityModule,
    VaultModule,
    ScannerModule
  ]
})
export class SecurityModule {}
