export class BrainRegistry {

    private readonly components = new Map<string, unknown>();

    register(name: string, component: unknown): void {

        this.components.set(name, component);

    }

    resolve<T>(name: string): T | undefined {

        return this.components.get(name) as T | undefined;

    }

    exists(name: string): boolean {

        return this.components.has(name);

    }

    remove(name: string): boolean {

        return this.components.delete(name);

    }

    clear(): void {

        this.components.clear();

    }

    keys(): string[] {

        return [...this.components.keys()];

    }

}