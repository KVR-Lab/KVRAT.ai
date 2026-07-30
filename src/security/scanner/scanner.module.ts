import { Module } from '@nestjs/common';
import { SecretScanner } from './secret.scanner';

@Module({
  providers: [
    SecretScanner
  ],
  exports: [
    SecretScanner
  ]
})
export class ScannerModule {}