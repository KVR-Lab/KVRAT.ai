"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlannerEngine = void 0;
class PlannerEngine {
    plan(goal) {
        return {
            planned: true,
            goal
        };
    }
}
exports.PlannerEngine = PlannerEngine;
