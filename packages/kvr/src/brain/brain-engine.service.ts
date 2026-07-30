import { Injectable } from "@nestjs/common";

@Injectable()
export class BrainEngineService {

    think(input: string): string {

        return `Processing: ${input}`;

    }

    analyze(data: unknown): unknown {

        return data;

    }

    decide(options: string[]): string | null {

        if (!options.length) {

            return null;

        }

        return options[0];

    }

}