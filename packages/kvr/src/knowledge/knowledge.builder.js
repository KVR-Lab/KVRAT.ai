"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeBuilder = void 0;
const common_1 = require("@nestjs/common");
let KnowledgeBuilder = class KnowledgeBuilder {
    build(graph, analysis) {
        const model = {
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
            const current = model.nodes.find(n => n.id === module.module);
            if (!current)
                continue;
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
            const current = model.nodes.find(n => n.id === service.service);
            if (!current)
                continue;
            current.metadata = {
                dependencies: service.dependencies
            };
        }
        //----------------------------------------
        // Controller Metadata
        //----------------------------------------
        for (const controller of analysis.controllers) {
            const current = model.nodes.find(n => n.id === controller.controller);
            if (!current)
                continue;
            current.metadata = {
                services: controller.services
            };
        }
        return model;
    }
};
exports.KnowledgeBuilder = KnowledgeBuilder;
exports.KnowledgeBuilder = KnowledgeBuilder = __decorate([
    (0, common_1.Injectable)()
], KnowledgeBuilder);
