import { Injectable } from "@nestjs/common";
import { LlmGateway } from "../llm/llm.gateway";
import { MemoryService } from "../memory/memory.service";
import { KnowledgeService } from "../knowledge/knowledge.service";

@Injectable()
export class BrainService {

    constructor(
        private readonly llm: LlmGateway,
        private readonly memory: MemoryService,
        private readonly knowledge: KnowledgeService
    ) {}

    async think(plan: any) {

        const question =
            typeof plan === "string"
                ? plan
                : JSON.stringify(plan, null, 2);

        const memoryContext =
            this.memory.search(question);

        const knowledgeContext =
            this.knowledge.search(question);

        const prompt = `
You are KVR-Core Brain.

=== MEMORY ===

${JSON.stringify(memoryContext, null, 2)}

=== KNOWLEDGE ===

${knowledgeContext
    .map(k => k.content)
    .join("\n\n")}

=== USER REQUEST ===

${question}

Provide the best answer using Memory and Knowledge before reasoning.
`;

        const answer = await this.llm.chat(
            "ollama",
            prompt
        );

        this.memory.store({

            timestamp: new Date().toISOString(),

            question,

            answer

        });

        return answer;

    }

}