export interface BrainTask {

    id: string;

    title: string;

    completed: boolean;

}

export class BrainPlanner {

    private readonly tasks: BrainTask[] = [];

    add(task: BrainTask): void {

        this.tasks.push(task);

    }

    complete(id: string): void {

        const task = this.tasks.find(t => t.id === id);

        if (task) {

            task.completed = true;

        }

    }

    pending(): BrainTask[] {

        return this.tasks.filter(

            task => !task.completed

        );

    }

    all(): BrainTask[] {

        return [...this.tasks];

    }

}