export class RuntimePipeline {

    private readonly steps: Array<() => void> = [];

    add(step: () => void): void {

        this.steps.push(step);

    }

    remove(index: number): void {

        this.steps.splice(index, 1);

    }

    clear(): void {

        this.steps.length = 0;

    }

    run(): void {

        for (const step of this.steps) {

            step();

        }

    }

    count(): number {

        return this.steps.length;

    }

}