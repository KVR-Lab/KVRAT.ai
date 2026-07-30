import { Module } from '@nestjs/common';
import { AIGovernanceService } from './ai-governance.service';

@Module({
 providers:[AIGovernanceService],
 exports:[AIGovernanceService]
})
export class AIGovernanceModule {}