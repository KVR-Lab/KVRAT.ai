import { BootstrapEngine } from "./engine.interface";

export class PluginEngine implements BootstrapEngine {

    readonly name = "plugin";

    boot(){
        console.log("[KVR] Plugin Engine started");
    }

}
