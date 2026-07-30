import { Module } from '@nestjs/common';
import { AutonomyOSService } from './autonomy-os.service';

@Module({
 providers:[AutonomyOSService],
 exports:[AutonomyOSService]
})
export class AutonomyOSModule {}