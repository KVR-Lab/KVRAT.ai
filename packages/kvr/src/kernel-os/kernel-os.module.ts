import { Module } from '@nestjs/common';
import { KernelOsService } from './kernel-os.service';

@Module({
 providers:[KernelOsService],
 exports:[KernelOsService]
})
export class KernelOsModule {}
