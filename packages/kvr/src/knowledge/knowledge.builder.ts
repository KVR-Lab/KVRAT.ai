import { Injectable } from "@nestjs/common";

import {
    AnalysisResult
} from "../engines/project-engine/project.analyzer";

import {
    KnowledgeGraph
} from "../engines/project-engine/project.graph";

export interface KnowledgeNode {

    id: string;

    type: string;

    label: string;

    metadata?: Record<string, any>;

}

export interface KnowledgeEdge {

    from: string;

    to: string;

    relation: string;

}

export interface KnowledgeModel {

    generatedAt: Date;

    nodes: KnowledgeNode[];

    edges: KnowledgeEdge[];

}

@Injectable()
export class KnowledgeBuilder {

    build(

        graph: KnowledgeGraph,

        analysis: AnalysisResult

    ): KnowledgeModel {

        const model: KnowledgeModel = {

            generatedAt: new Date(),

            nodes: [],

            edges: []

        };

        //----------------------------------------
        // Graph Nodes
        //----------------------------------------

        for (const node of graph.nodes) {

            model.nodes.push({

                id: node.id,

                type: node.type,

                label: node.label,

                metadata: {}

            });

        }

        //----------------------------------------
        // Graph Edges
        //----------------------------------------

        for (const edge of graph.edges) {

            model.edges.push({

                from: edge.from,

                to: edge.to,

                relation: edge.relation

            });

        }

        //----------------------------------------
        // Module Metadata
        //----------------------------------------

        for (const module of analysis.modules) {

            const current = model.nodes.find(

                n => n.id === module.module

            );

            if (!current) continue;

            current.metadata = {

                imports: module.imports,

                providers: module.providers,

                controllers: module.controllers

            };

        }

        //----------------------------------------
        // Service Metadata
        //----------------------------------------

        for (const service of analysis.services) {

            const current = model.nodes.find(

                n => n.id === service.service

            );

            if (!current) continue;

            current.metadata = {

                dependencies: service.dependencies

            };

        }

        //----------------------------------------
        // Controller Metadata
        //----------------------------------------

        for (const controller of analysis.controllers) {

            const current = model.nodes.find(

                n => n.id === controller.controller

            );

            if (!current) continue;

            current.metadata = {

                services: controller.services

            };

        }

        return model;

    }

}
