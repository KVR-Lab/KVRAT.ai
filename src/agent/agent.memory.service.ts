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
