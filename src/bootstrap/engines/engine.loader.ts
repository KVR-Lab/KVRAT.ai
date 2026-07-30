import { BootstrapEngine } from "./engine.interface";

import { KnowledgeEngine } from "./knowledge.engine";
import { MemoryEngine } from "./memory.engine";
import { PlannerEngine } from "./planner.engine";
import { ExecutorEngine } from "./executor.engine";
import { AiEngine } from "./ai.engine";

import { CommandEngine } from "./command.engine";
import { ContextEngine } from "./context.engine";
import { EventEngine } from "./event.engine";
import { PipelineEngine } from "./pipeline.engine";
import { PluginEngine } from "./plugin.engine";
import { RegistryEngine } from "./registry.engine";
import { RuntimeEngine } from "./runtime.engine";
import { SchedulerEngine } from "./scheduler.engine";
import { ValidatorEngine } from "./validator.engine";
import { WorkflowEngine } from "./workflow.engine";


export class EngineLoader {

    private readonly engines: BootstrapEngine[] = [
        new RuntimeEngine(),
        new RegistryEngine(),
        new ContextEngine(),

        new EventEngine(),
        new PipelineEngine(),

        new PluginEngine(),
        new SchedulerEngine(),

        new ValidatorEngine(),
        new WorkflowEngine(),

        new CommandEngine(),

        new KnowledgeEngine(),
        new MemoryEngine(),
        new PlannerEngine(),
        new ExecutorEngine(),
        new AiEngine(),
    ];


    boot() {

        this.engines.forEach(engine => {

            engine.boot();

        });


        return this.engines.map(
            engine => engine.name
        );

    }

}
