import { Module } from '@nestjs/common';
import { SystemMemoryOsService } from './system-memory-os.service';

@Module({
 providers:[SystemMemoryOsService],
 exports:[SystemMemoryOsService]
})
export class SystemMemoryOsModule {}
