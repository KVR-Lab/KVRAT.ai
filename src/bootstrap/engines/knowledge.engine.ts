import { BootstrapEngine } from "./engine.interface";

export class KnowledgeEngine implements BootstrapEngine {

    readonly name = "Knowledge";

    boot() {
        console.log("[BOOT] Knowledge Engine");
    }
}
