import { BootstrapEngine } from "./engine.interface";

export class RegistryEngine implements BootstrapEngine {

    readonly name = "registry";

    boot(){
        console.log("[KVR] Registry Engine started");
    }

}
