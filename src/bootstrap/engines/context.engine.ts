import { BootstrapEngine } from "./engine.interface";

export class ContextEngine implements BootstrapEngine {

    readonly name = "context";

    boot(){
        console.log("[KVR] Context Engine started");
    }

}
