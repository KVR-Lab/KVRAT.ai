import { BootstrapEngine } from "./engine.interface";

export class WorkflowEngine implements BootstrapEngine {

    readonly name = "workflow";

    boot(){
        console.log("[KVR] Workflow Engine started");
    }

}
