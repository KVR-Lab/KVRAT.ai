import { Injectable } from "@nestjs/common";

import { ProjectIndexer } from "../engines/project-engine/project.indexer";
import { ProjectAnalyzer } from "../engines/project-engine/project.analyzer";
import { ProjectGraph } from "../engines/project-engine/project.graph";
import { ProjectRepository } from "../engines/project-engine/project.repository";

@Injectable()
export class KnowledgeEngineService {

    constructor(

        private readonly indexer = new ProjectIndexer(),

        private readonly analyzer = new ProjectAnalyzer(),

        private readonly graph = new ProjectGraph(),

        private readonly repository = new ProjectRepository()

    ) {}

    build(root: string) {

        const index = this.indexer.build(root);

        const analysis = this.analyzer.analyze(root);

        const knowledge = this.graph.build(root);

        this.repository.save({

            timestamp: new Date(),

            root,

            index,

            analysis,

            graph: knowledge

        });

        return this.repository.get();

    }

    getKnowledge() {

        return this.repository.get();

    }

    hasKnowledge() {

        return this.repository.hasSnapshot();

    }

    clear() {

        this.repository.clear();

    }

}