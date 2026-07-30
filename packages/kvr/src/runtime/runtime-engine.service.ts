import { Injectable } from "@nestjs/common";

import { RuntimeContext } from "./runtime.context";
import { RuntimeSession } from "./runtime.session";
import { RuntimeState } from "./runtime.state";
import { RuntimeExecutor } from "./runtime.executor";
import { RuntimePipeline } from "./runtime.pipeline";
import { RuntimeRegistry } from "./runtime.registry";

@Injectable()
export class RuntimeEngineService {

    private readonly registry = new RuntimeRegistry();

    private readonly executor = new RuntimeExecutor();

    private readonly pipeline = new RuntimePipeline();

    private state: RuntimeState = {

        status: "idle"

    };

    boot(context: RuntimeContext): RuntimeSession {

        this.state.status = "running";

return {

    id: crypto.randomUUID(),

    context,

    startedAt: new Date(),

    lastActivity: new Date(),

    isActive: true

};
    }

    execute(task: () => void): void {

        this.executor.execute(task);

    }

    pipelineRun(): void {

        this.pipeline.run();

    }

    getState(): RuntimeState {

        return this.state;

    }

    stop(): void {

        this.state.status = "stopped";

    }

    registryInstance(): RuntimeRegistry {

        return this.registry;

    }

}