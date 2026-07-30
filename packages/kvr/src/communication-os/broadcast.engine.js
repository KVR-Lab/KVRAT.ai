"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastEngine = void 0;
class BroadcastEngine {
    execute(input) {
        return {
            engine: "broadcast",
            success: true,
            data: input
        };
    }
}
exports.BroadcastEngine = BroadcastEngine;
