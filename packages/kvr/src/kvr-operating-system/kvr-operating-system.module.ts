import { Module } from '@nestjs/common';
import { KVROperatingSystemService } from './kvr-operating-system.service';

@Module({
 providers:[KVROperatingSystemService],
 exports:[KVROperatingSystemService]
})
export class KVROperatingSystemModule {}