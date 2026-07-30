import { BootstrapEngine } from "./engine.interface";

export class MemoryEngine implements BootstrapEngine {

    readonly name = "Memory";

    boot() {
        console.log("[BOOT] Memory Engine");
    }
}
