import { Module } from '@nestjs/common';
import { SystemOSService } from './system-os.service';

@Module({
 providers:[SystemOSService],
 exports:[SystemOSService]
})
export class SystemOSModule {}