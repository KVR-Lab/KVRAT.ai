import { BootstrapEngine } from "./engine.interface";

export class AiEngine implements BootstrapEngine {

    readonly name = "AI";

    boot() {
        console.log("[BOOT] AI Engine");
    }
}
