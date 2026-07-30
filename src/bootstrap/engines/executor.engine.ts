import { BootstrapEngine } from "./engine.interface";

export class ExecutorEngine implements BootstrapEngine {

    readonly name = "Executor";

    boot() {
        console.log("[BOOT] Executor Engine");
    }
}
