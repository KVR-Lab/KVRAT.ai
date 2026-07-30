import { Module } from '@nestjs/common';
import { SystemOrchestratorService } from './system-orchestrator.service';

@Module({
 providers:[SystemOrchestratorService],
 exports:[SystemOrchestratorService]
})
export class SystemOrchestratorModule {}
