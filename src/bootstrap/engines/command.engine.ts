import { BootstrapEngine } from "./engine.interface";

export class CommandEngine implements BootstrapEngine {

    readonly name = "command";

    boot(){
        console.log("[KVR] Command Engine started");
    }

}
