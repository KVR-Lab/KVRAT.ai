import { Injectable } from "@nestjs/common";

import { HybridBrainService } from "./brain/hybrid/hybrid-brain.service";
import { BrainOrchestratorService } from "./brain/orchestrator/brain-orchestrator.service";
import { IntentEngineService } from "./brain/v2/intent-engine.service";
import { SystemBrainService } from "./brain/system-brain.service";
import { LlmGateway } from "../llm/llm.gateway";

@Injectable()
export class AiService {

    constructor(
        private readonly hybrid: HybridBrainService,
        private readonly orchestrator: BrainOrchestratorService,
        private readonly intent: IntentEngineService,
        private readonly system: SystemBrainService,
        private readonly llm: LlmGateway
    ) {}

    async process(message: string) {

        const detected =
            this.intent.detect(message);

        const orchestration =
            await this.orchestrator.handleMessage(message);

        const blueprint =
            await this.system.process(message);

        const hybrid =
            await this.hybrid.process({
                idea: message
            });

        let llm: any = null;

        try {

            llm = await this.llm.chat(
                "ollama",
                message
            );

        } catch (e: any) {

            llm = {
                provider: "ollama",
                error: e.message
            };

        }

        return {

            ok: true,

            engine: "KVR-Core",

            input: message,

            intent: detected,

            orchestrator: orchestration,

            blueprint,

            hybrid,

            llm

        };

    }

    async ask(prompt: string) {
        return this.process(prompt);
    }

    async execute(command: string) {
        return this.process(command);
    }

}