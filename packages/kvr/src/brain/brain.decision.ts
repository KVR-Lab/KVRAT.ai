export interface DecisionOption {

    id: string;

    title: string;

    score: number;

}

export class BrainDecision {

    choose(options: DecisionOption[]): DecisionOption | null {

        if (options.length === 0) {

            return null;

        }

        return options.sort(

            (a, b) => b.score - a.score

        )[0];

    }

}