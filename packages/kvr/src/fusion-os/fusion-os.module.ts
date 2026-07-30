import { Module } from '@nestjs/common';
import { FusionOSService } from './fusion-os.service';

@Module({
 providers:[FusionOSService],
 exports:[FusionOSService]
})
export class FusionOSModule {}