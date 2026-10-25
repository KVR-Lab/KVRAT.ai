import { Controller, Get, Delete } from '@nestjs/common';
import { RequireExecutionKey } from '../security/execution-access.guard';
import { MemoryService } from './memory.service';


@RequireExecutionKey()
@Controller('memory')
export class MemoryController {

constructor(
private readonly memory:MemoryService
){}


@Get()
all(){

return this.memory.getAll();

}


@Delete()
clear(){

return this.memory.clear();

}

}