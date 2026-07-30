$ErrorActionPreference="Stop"

Write-Host "[KVR] Repairing MemoryService"


$path = ".\src\memory\memory.service.ts"


@"
import { Injectable } from '@nestjs/common';


@Injectable()
export class MemoryService {


private memory:any[] = [];



store(item:any)
{

this.memory.push(item);

return item;

}



getAll()
{

return this.memory;

}


save(item:any)
{

return this.store(item);

}



all()
{

return this.getAll();

}



}
"@ | Set-Content $path -Encoding UTF8



Write-Host "[KVR] MemoryService repaired"