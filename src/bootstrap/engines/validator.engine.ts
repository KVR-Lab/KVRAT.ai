import { BootstrapEngine } from "./engine.interface";

export class ValidatorEngine implements BootstrapEngine {

    readonly name = "validator";

    boot(){
        console.log("[KVR] Validator Engine started");
    }

}
