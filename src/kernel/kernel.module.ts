import { Global, Module } from '@nestjs/common';
import { KernelService } from './kernel.service';
import { KernelRegistry } from './kernel.registry';

@Global()
@Module({
  providers: [
    KernelService,
    KernelRegistry,
  ],
  exports: [
    KernelService,
    KernelRegistry,
  ],
})
export class KvrKernelModule {}