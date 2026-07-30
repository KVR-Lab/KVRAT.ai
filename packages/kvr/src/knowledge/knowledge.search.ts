import { Injectable } from "@nestjs/common";

import {

    KnowledgeModel,

    KnowledgeNode,

    KnowledgeEdge

} from "./knowledge.builder";

@Injectable()
export class KnowledgeSearch {

    byId(

        model: KnowledgeModel,

        id: string

    ): KnowledgeNode | undefined {

        return model.nodes.find(

            n => n.id.toLowerCase() === id.toLowerCase()

        );

    }

    byType(

        model: KnowledgeModel,

        type: string

    ): KnowledgeNode[] {

        return model.nodes.filter(

            n => n.type.toLowerCase() === type.toLowerCase()

        );

    }

    byName(

        model: KnowledgeModel,

        keyword: string

    ): KnowledgeNode[] {

        const value = keyword.toLowerCase();

        return model.nodes.filter(

            n =>

                n.label.toLowerCase().includes(value) ||

                n.id.toLowerCase().includes(value)

        );

    }

    dependencies(

        model: KnowledgeModel,

        nodeId: string

    ): KnowledgeEdge[] {

        return model.edges.filter(

            e => e.from === nodeId

        );

    }

    dependents(

        model: KnowledgeModel,

        nodeId: string

    ): KnowledgeEdge[] {

        return model.edges.filter(

            e => e.to === nodeId

        );

    }

    impact(

        model: KnowledgeModel,

        nodeId: string

    ) {

        return {

            target: this.byId(model, nodeId),

            dependsOn: this.dependencies(model, nodeId),

            usedBy: this.dependents(model, nodeId)

        };

    }

    exists(

        model: KnowledgeModel,

        nodeId: string

    ): boolean {

        return this.byId(model, nodeId) !== undefined;

    }

}