import { ProjectIndex } from "./project.indexer";
import { AnalysisResult } from "./project.analyzer";
import { KnowledgeGraph } from "./project.graph";

export interface ProjectSnapshot {

    timestamp: Date;

    root: string;

    index: ProjectIndex;

    analysis: AnalysisResult;

    graph: KnowledgeGraph;

}

export class ProjectRepository {

    private snapshot?: ProjectSnapshot;

    save(snapshot: ProjectSnapshot): void {

        this.snapshot = snapshot;

    }

    get(): ProjectSnapshot | undefined {

        return this.snapshot;

    }

    hasSnapshot(): boolean {

        return this.snapshot !== undefined;

    }

    clear(): void {

        this.snapshot = undefined;

    }

    getIndex(): ProjectIndex | undefined {

        return this.snapshot?.index;

    }

    getAnalysis(): AnalysisResult | undefined {

        return this.snapshot?.analysis;

    }

    getGraph(): KnowledgeGraph | undefined {

        return this.snapshot?.graph;

    }

    updateGraph(graph: KnowledgeGraph): void {

        if (!this.snapshot) {

            return;

        }

        this.snapshot.graph = graph;

        this.snapshot.timestamp = new Date();

    }

    updateAnalysis(analysis: AnalysisResult): void {

        if (!this.snapshot) {

            return;

        }

        this.snapshot.analysis = analysis;

        this.snapshot.timestamp = new Date();

    }

    updateIndex(index: ProjectIndex): void {

        if (!this.snapshot) {

            return;

        }

        this.snapshot.index = index;

        this.snapshot.timestamp = new Date();

    }

}