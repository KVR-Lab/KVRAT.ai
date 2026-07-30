import { BootstrapEngine } from "./engine.interface";

export class PipelineEngine implements BootstrapEngine {

    readonly name = "pipeline";

    boot(){
        console.log("[KVR] Pipeline Engine started");
    }

}
