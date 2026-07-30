import { BootstrapEngine } from "./engine.interface";

export class SchedulerEngine implements BootstrapEngine {

    readonly name = "scheduler";

    boot(){
        console.log("[KVR] Scheduler Engine started");
    }

}
