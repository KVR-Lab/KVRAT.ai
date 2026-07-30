$ErrorActionPreference="Stop"

Write-Host "[KVR] Resetting MemoryService"


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



save(item:any)
{

return this.store(item);

}



getAll()
{

return this.memory;

}



all()
{

return this.getAll();

}



clear()
{

this.memory = [];

return {
cleared:true
};

}



}
"@ | Set-Content $path -Encoding UTF8


Write-Host "[KVR] MemoryService reset complete"