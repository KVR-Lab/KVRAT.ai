"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticEngine = void 0;
class DiagnosticEngine {
    analyze(system) {
        return {
            detected: true,
            system
        };
    }
}
exports.DiagnosticEngine = DiagnosticEngine;
