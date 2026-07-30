"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityHistoryEngine = void 0;
class IdentityHistoryEngine {
    record(event) {
        return {
            recorded: true,
            event
        };
    }
}
exports.IdentityHistoryEngine = IdentityHistoryEngine;
