import { Controller, Get, Delete } from '@nestjs/common';
import { MemoryService } from './memory.service';


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