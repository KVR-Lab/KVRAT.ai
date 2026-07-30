import { Injectable } from "@nestjs/common";

import {

    KnowledgeMemory,
    MemoryEntry

} from "./knowledge.memory";

import {

    KnowledgeModel

} from "./knowledge.builder";

@Injectable()
export class KnowledgeRepository {

    constructor(

        private readonly memory = new KnowledgeMemory()

    ) {}

    save(

        id: string,

        model: KnowledgeModel,

        tags: string[] = []

    ): MemoryEntry {

        if (this.memory.exists(id)) {

            const updated = this.memory.update(id, model);

            if (updated) {

                return updated;

            }

        }

        return this.memory.save(

            id,

            model,

            tags

        );

    }

    load(

        id: string

    ): MemoryEntry | undefined {

        return this.memory.get(id);

    }

    delete(

        id: string

    ): boolean {

        return this.memory.remove(id);

    }

    exists(

        id: string

    ): boolean {

        return this.memory.exists(id);

    }

    list(): MemoryEntry[] {

        return this.memory.list();

    }

    clear(): void {

        this.memory.clear();

    }

    searchByTag(

        tag: string

    ): MemoryEntry[] {

        return this.memory.searchByTag(tag);

    }

    statistics() {

        return this.memory.statistics();

    }

}