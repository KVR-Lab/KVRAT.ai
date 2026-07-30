export class RuntimeExecutor {

    execute(task: () => void): void {

        task();

    }

    executeAsync(task: () => Promise<void>): Promise<void> {

        return task();

    }

}
