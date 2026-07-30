$root = "D:\KVR-Core\src\bootstrap\engines"

New-Item -ItemType Directory -Path $root -Force | Out-Null

@'
export interface BootstrapEngine {
    readonly name: string;
    boot(): Promise<void> | void;
}
'@ | Set-Content "$root\engine.interface.ts"

@'
import { BootstrapEngine } from "./engine.interface";
import { KnowledgeEngine } from "./knowledge.engine";
import { MemoryEngine } from "./memory.engine";
import { PlannerEngine } from "./planner.engine";
import { ExecutorEngine } from "./executor.engine";
import { AiEngine } from "./ai.engine";

export class EngineLoader {

    private readonly engines: BootstrapEngine[] = [
        new KnowledgeEngine(),
        new MemoryEngine(),
        new PlannerEngine(),
        new ExecutorEngine(),
        new AiEngine(),
    ];

    boot() {
        this.engines.forEach(e => e.boot());
        return this.engines.map(e => e.name);
    }
}
'@ | Set-Content "$root\engine.loader.ts"

@'
import { BootstrapEngine } from "./engine.interface";

export class KnowledgeEngine implements BootstrapEngine {

    readonly name = "Knowledge";

    boot() {
        console.log("[BOOT] Knowledge Engine");
    }
}
'@ | Set-Content "$root\knowledge.engine.ts"

@'
import { BootstrapEngine } from "./engine.interface";

export class MemoryEngine implements BootstrapEngine {

    readonly name = "Memory";

    boot() {
        console.log("[BOOT] Memory Engine");
    }
}
'@ | Set-Content "$root\memory.engine.ts"

@'
import { BootstrapEngine } from "./engine.interface";

export class PlannerEngine implements BootstrapEngine {

    readonly name = "Planner";

    boot() {
        console.log("[BOOT] Planner Engine");
    }
}
'@ | Set-Content "$root\planner.engine.ts"

@'
import { BootstrapEngine } from "./engine.interface";

export class ExecutorEngine implements BootstrapEngine {

    readonly name = "Executor";

    boot() {
        console.log("[BOOT] Executor Engine");
    }
}
'@ | Set-Content "$root\executor.engine.ts"

@'
import { BootstrapEngine } from "./engine.interface";

export class AiEngine implements BootstrapEngine {

    readonly name = "AI";

    boot() {
        console.log("[BOOT] AI Engine");
    }
}
'@ | Set-Content "$root\ai.engine.ts"

Write-Host ""
Write-Host "===================================="
Write-Host " Bootstrap Pack 01 Completed"
Write-Host "===================================="
Write-Host ""
