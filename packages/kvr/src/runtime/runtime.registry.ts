export class RuntimeRegistry {

    private readonly services = new Map<string, unknown>();

    register(name: string, service: unknown): void {

        this.services.set(name, service);

    }

    get<T>(name: string): T | undefined {

        return this.services.get(name) as T | undefined;

    }

    has(name: string): boolean {

        return this.services.has(name);

    }

    remove(name: string): boolean {

        return this.services.delete(name);

    }

    clear(): void {

        this.services.clear();

    }

    keys(): string[] {

        return Array.from(this.services.keys());

    }

}
