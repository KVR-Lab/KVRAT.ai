export interface BrainMemory {

    id: string;

    input: string;

    output: string;

    context: string;

    createdAt: Date;

    score?: number;

}

export class BrainMemoryStore {

    private readonly memories: BrainMemory[] = [];

    add(memory: BrainMemory): void {

        this.memories.push(memory);

    }

    all(): BrainMemory[] {

        return [...this.memories];

    }

    find(id: string): BrainMemory | undefined {

        return this.memories.find(

            memory => memory.id === id

        );

    }

    clear(): void {

        this.memories.length = 0;

    }

}