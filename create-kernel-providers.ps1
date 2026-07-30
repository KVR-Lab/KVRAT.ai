$path = ".\src\kernel"

$files = @{

".\src\kernel\kernel.providers.ts" = @"
import { RuntimeManager } from '../runtime/manager/runtime.manager';
import { RegistryService } from '../registry/registry.service';
import { EventBus } from '../events/bus/event.bus';


export const KVR_PROVIDERS = [

    RuntimeManager,

    RegistryService,

    EventBus

];

"@

}


foreach($file in $files.Keys)
{
    Set-Content `
    -Path $file `
    -Value $files[$file] `
    -Encoding UTF8

    Write-Host "[CREATE] $file"
}

Write-Host "Kernel providers ready"