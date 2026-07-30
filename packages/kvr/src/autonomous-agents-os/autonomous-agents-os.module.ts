import { Module } from '@nestjs/common';
import { AutonomousAgentsOSService } from './autonomous-agents-os.service';

@Module({
 providers:[AutonomousAgentsOSService],
 exports:[AutonomousAgentsOSService]
})
export class AutonomousAgentsOSModule {}