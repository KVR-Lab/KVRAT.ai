import { Module } from '@nestjs/common';
import { AgentOsService } from './agent-os.service';

@Module({
 providers:[AgentOsService],
 exports:[AgentOsService]
})
export class AgentOsModule {}
