"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScalingEngine = void 0;
class ScalingEngine {
    scale(resources) {
        return {
            scaled: true,
            resources
        };
    }
}
exports.ScalingEngine = ScalingEngine;
