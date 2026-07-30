import { Module } from '@nestjs/common';
import { ControlCenterOSService } from './control-center-os.service';

@Module({
 providers:[ControlCenterOSService],
 exports:[ControlCenterOSService]
})
export class ControlCenterOSModule {}