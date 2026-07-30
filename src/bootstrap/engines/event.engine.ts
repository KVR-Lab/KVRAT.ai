import { BootstrapEngine } from "./engine.interface";

export class EventEngine implements BootstrapEngine {

    readonly name = "event";

    boot(){
        console.log("[KVR] Event Engine started");
    }

}
