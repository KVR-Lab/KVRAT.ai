import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MemoryService {

    private file = path.join(
        process.cwd(),
        'data',
        'memory.json'
    );

    private memory: any[] = [];

    constructor() {
        this.load();
    }

    private load() {

        if (fs.existsSync(this.file)) {

            this.memory = JSON.parse(
                fs.readFileSync(
                    this.file,
                    'utf8'
                )
            );

        }

    }

    private persist() {

        fs.mkdirSync(
            path.dirname(this.file),
            {
                recursive: true
            }
        );

        fs.writeFileSync(
            this.file,
            JSON.stringify(
                this.memory,
                null,
                2
            )
        );

    }

    store(item: any) {

        this.memory.push(item);

        this.persist();

        return item;

    }

    search(query: string) {

        const q = query.toLowerCase();

        return this.memory.filter(x => {

            const text =
                JSON.stringify(x)
                    .toLowerCase();

            return text.includes(q);

        });

    }

    getAll() {

        return {

            value: this.memory,

            count: this.memory.length

        };

    }

    findAll() {

        return this.memory;

    }

    clear() {

        this.memory = [];

        this.persist();

        return {

            cleared: true

        };

    }

}