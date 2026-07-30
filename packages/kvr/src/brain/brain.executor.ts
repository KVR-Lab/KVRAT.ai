export interface BrainAction {

    id: string;

    name: string;

    execute: () => Promise<void>;

}

export class BrainExecutor {

    async run(action: BrainAction): Promise<void> {

        await action.execute();

    }

    async runMany(actions: BrainAction[]): Promise<void> {

        for (const action of actions) {

            await this.run(action);

        }

    }

}