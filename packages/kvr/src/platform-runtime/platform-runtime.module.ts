import { Module } from '@nestjs/common';
import { PlatformRuntimeService } from './platform-runtime.service';

@Module({
 providers:[PlatformRuntimeService],
 exports:[PlatformRuntimeService]
})
export class PlatformRuntimeModule {}