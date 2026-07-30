import { BootstrapEngine } from "./engine.interface";

export class PlannerEngine implements BootstrapEngine {

    readonly name = "Planner";

    boot() {
        console.log("[BOOT] Planner Engine");
    }
}
