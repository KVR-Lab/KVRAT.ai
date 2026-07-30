"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeMonitorEngine = void 0;
class RuntimeMonitorEngine {
    monitor(runtime) {
        return {
            monitoring: true,
            data: runtime
        };
    }
}
exports.RuntimeMonitorEngine = RuntimeMonitorEngine;
