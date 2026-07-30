import { Injectable } from "@nestjs/common";

import {

    KnowledgeModel

} from "./knowledge.builder";

export interface MemoryEntry {

    id: string;

    createdAt: Date;

    updatedAt: Date;

    tags: string[];

    knowledge: KnowledgeModel;

}

@Injectable()
export class KnowledgeMemory {

    private readonly storage = new Map<string, MemoryEntry>();

    save(

        id: string,

        knowledge: KnowledgeModel,

        tags: string[] = []

    ): MemoryEntry {

        const now = new Date();

        const entry: MemoryEntry = {

            id,

            createdAt: now,

            updatedAt: now,

            tags,

            knowledge

        };

        this.storage.set(id, entry);

        return entry;

    }

    update(

        id: string,

        knowledge: KnowledgeModel

    ): MemoryEntry | undefined {

        const current = this.storage.get(id);

        if (!current) {

            return undefined;

        }

        current.updatedAt = new Date();

        current.knowledge = knowledge;

        this.storage.set(id, current);

        return current;

    }

    get(

        id: string

    ): MemoryEntry | undefined {

        return this.storage.get(id);

    }

    exists(

        id: string

    ): boolean {

        return this.storage.has(id);

    }

    remove(

        id: string

    ): boolean {

        return this.storage.delete(id);

    }

    clear(): void {

        this.storage.clear();

    }

    list(): MemoryEntry[] {

        return Array.from(this.storage.values());

    }

    searchByTag(

        tag: string

    ): MemoryEntry[] {

        return this.list().filter(

            entry =>

                entry.tags.some(

                    t =>

                        t.toLowerCase() === tag.toLowerCase()

                )

        );

    }

    statistics() {

        return {

            snapshots: this.storage.size,

            ids: Array.from(this.storage.keys())

        };

    }

}