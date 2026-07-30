import { Module } from '@nestjs/common';
import { KVRCoreOSService } from './kvr-core-os.service';

@Module({
 providers:[KVRCoreOSService],
 exports:[KVRCoreOSService]
})
export class KVRCoreOSModule {}