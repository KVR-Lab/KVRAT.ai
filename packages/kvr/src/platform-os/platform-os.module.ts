import { Module } from '@nestjs/common';
import { PlatformOSService } from './platform-os.service';

@Module({
 providers:[PlatformOSService],
 exports:[PlatformOSService]
})
export class PlatformOSModule {}