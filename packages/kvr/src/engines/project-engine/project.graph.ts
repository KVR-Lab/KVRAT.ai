import { ProjectAnalyzer } from "./project.analyzer";

export interface GraphNode {

    id: string;

    type: string;

    label: string;

}

export interface GraphEdge {

    from: string;

    to: string;

    relation: string;

}

export interface KnowledgeGraph {

    nodes: GraphNode[];

    edges: GraphEdge[];

}

export class ProjectGraph {

    constructor(
        private readonly analyzer = new ProjectAnalyzer()
    ) {}

    build(root: string): KnowledgeGraph {

        const analysis = this.analyzer.analyze(root);

        const graph: KnowledgeGraph = {

            nodes: [],

            edges: []

        };

        //---------------------------------------
        // Modules
        //---------------------------------------

        for (const module of analysis.modules) {

            graph.nodes.push({

                id: module.module,

                type: "module",

                label: module.module

            });

            for (const provider of module.providers) {

                graph.edges.push({

                    from: module.module,

                    to: provider,

                    relation: "provides"

                });

            }

            for (const controller of module.controllers) {

                graph.edges.push({

                    from: module.module,

                    to: controller,

                    relation: "controls"

                });

            }

            for (const imported of module.imports) {

                graph.edges.push({

                    from: module.module,

                    to: imported,

                    relation: "imports"

                });

            }

        }

        //---------------------------------------
        // Services
        //---------------------------------------

        for (const service of analysis.services) {

            graph.nodes.push({

                id: service.service,

                type: "service",

                label: service.service

            });

            for (const dependency of service.dependencies) {

                graph.edges.push({

                    from: service.service,

                    to: dependency,

                    relation: "depends_on"

                });

            }

        }

        //---------------------------------------
        // Controllers
        //---------------------------------------

        for (const controller of analysis.controllers) {

            graph.nodes.push({

                id: controller.controller,

                type: "controller",

                label: controller.controller

            });

            for (const service of controller.services) {

                graph.edges.push({

                    from: controller.controller,

                    to: service,

                    relation: "uses"

                });

            }

        }

        return graph;

    }

}