$ErrorActionPreference="Stop"

Write-Host "[KVR] Fixing Agent Memory Loop"


# Fix agent memory service

@"
import { Injectable } from '@nestjs/common';
import { MemoryService } from '../memory/memory.service';

@Injectable()
export class AgentMemoryService {

constructor(
private readonly memory:MemoryService
){}


remember(task:any,result:any)
{
return this.memory.store({
task,
result,
createdAt:new Date()
});
}


recall()
{
return this.memory.getAll();
}

}
"@ | Set-Content .\src\agent\agent.memory.service.ts -Encoding UTF8



# Fix agent module

@"
import { Module } from '@nestjs/common';

import { MemoryModule } from '../memory/memory.module';

import { AgentService } from './agent.service';

import { AgentController } from './agent.controller';

import { AgentMemoryService } from './agent.memory.service';


@Module({

imports:[
MemoryModule
],

controllers:[
AgentController
],

providers:[
AgentService,
AgentMemoryService
],

exports:[
AgentService
]

})
export class AgentModule {}
"@ | Set-Content .\src\agent\agent.module.ts -Encoding UTF8



Write-Host "[KVR] Agent Memory Fix Completed"