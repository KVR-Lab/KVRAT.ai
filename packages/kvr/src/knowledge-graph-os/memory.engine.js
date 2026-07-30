"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphMemoryEngine = void 0;
class GraphMemoryEngine {
    store(data) {
        return {
            stored: true,
            data
        };
    }
}
exports.GraphMemoryEngine = GraphMemoryEngine;
