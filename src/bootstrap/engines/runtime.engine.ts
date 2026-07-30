import { BootstrapEngine } from "./engine.interface";

export class RuntimeEngine implements BootstrapEngine {

    readonly name = "runtime";

    boot(){
        console.log("[KVR] Runtime Engine started");
    }

}
