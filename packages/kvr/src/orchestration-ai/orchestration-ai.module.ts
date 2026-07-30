import { Module } from '@nestjs/common';
import { OrchestrationAIService } from './orchestration-ai.service';

@Module({
 providers:[OrchestrationAIService],
 exports:[OrchestrationAIService]
})
export class OrchestrationAIModule {}