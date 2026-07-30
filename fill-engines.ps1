$files = @{

"src/bootstrap/engines/command.engine.ts" = @"
import { BootstrapEngine } from "./engine.interface";

export class CommandEngine implements BootstrapEngine {

    readonly name = "command";

    boot(){
        console.log("[KVR] Command Engine started");
    }

}
"@

"src/bootstrap/engines/context.engine.ts" = @"
import { BootstrapEngine } from "./engine.interface";

export class ContextEngine implements BootstrapEngine {

    readonly name = "context";

    boot(){
        console.log("[KVR] Context Engine started");
    }

}
"@

"src/bootstrap/engines/event.engine.ts" = @"
import { BootstrapEngine } from "./engine.interface";

export class EventEngine implements BootstrapEngine {

    readonly name = "event";

    boot(){
        console.log("[KVR] Event Engine started");
    }

}
"@

"src/bootstrap/engines/pipeline.engine.ts" = @"
import { BootstrapEngine } from "./engine.interface";

export class PipelineEngine implements BootstrapEngine {

    readonly name = "pipeline";

    boot(){
        console.log("[KVR] Pipeline Engine started");
    }

}
"@

"src/bootstrap/engines/plugin.engine.ts" = @"
import { BootstrapEngine } from "./engine.interface";

export class PluginEngine implements BootstrapEngine {

    readonly name = "plugin";

    boot(){
        console.log("[KVR] Plugin Engine started");
    }

}
"@

"src/bootstrap/engines/registry.engine.ts" = @"
import { BootstrapEngine } from "./engine.interface";

export class RegistryEngine implements BootstrapEngine {

    readonly name = "registry";

    boot(){
        console.log("[KVR] Registry Engine started");
    }

}
"@

"src/bootstrap/engines/runtime.engine.ts" = @"
import { BootstrapEngine } from "./engine.interface";

export class RuntimeEngine implements BootstrapEngine {

    readonly name = "runtime";

    boot(){
        console.log("[KVR] Runtime Engine started");
    }

}
"@

"src/bootstrap/engines/scheduler.engine.ts" = @"
import { BootstrapEngine } from "./engine.interface";

export class SchedulerEngine implements BootstrapEngine {

    readonly name = "scheduler";

    boot(){
        console.log("[KVR] Scheduler Engine started");
    }

}
"@

"src/bootstrap/engines/validator.engine.ts" = @"
import { BootstrapEngine } from "./engine.interface";

export class ValidatorEngine implements BootstrapEngine {

    readonly name = "validator";

    boot(){
        console.log("[KVR] Validator Engine started");
    }

}
"@

"src/bootstrap/engines/workflow.engine.ts" = @"
import { BootstrapEngine } from "./engine.interface";

export class WorkflowEngine implements BootstrapEngine {

    readonly name = "workflow";

    boot(){
        console.log("[KVR] Workflow Engine started");
    }

}
"@

}


foreach($file in $files.Keys)
{
    $folder = Split-Path $file

    if(!(Test-Path $folder))
    {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
    }

    Set-Content `
    -Path $file `
    -Value $files[$file] `
    -Encoding UTF8

    Write-Host "[UPDATED] $file"
}

Write-Host "KVR Engine files completed"