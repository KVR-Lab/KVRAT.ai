export interface RuntimeEvent {

    id: string;

    name: string;

    source: string;

    payload: unknown;

    timestamp: Date;

}

export class RuntimeEventBus {

    private readonly events: RuntimeEvent[] = [];

    publish(event: RuntimeEvent): void {

        this.events.push(event);

    }

    history(): RuntimeEvent[] {

        return [...this.events];

    }

    clear(): void {

        this.events.length = 0;

    }

}