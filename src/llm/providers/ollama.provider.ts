import { Injectable } from "@nestjs/common";
import { LlmProvider } from "../llm.provider";

@Injectable()
export class OllamaProvider implements LlmProvider {

    async chat(prompt: string): Promise<any> {

        const response = await fetch(
            "http://127.0.0.1:11434/api/generate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama3.2",
                    prompt,
                    stream: false
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Ollama HTTP ${response.status}`
            );
        }

        const data = await response.json();

        return {
            provider: "ollama",
            model: data.model,
            message: data.response,
            done: data.done,
            totalDuration: data.total_duration
        };
    }
}