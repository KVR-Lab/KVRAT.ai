"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootloaderEngine = void 0;
class BootloaderEngine {
    load(config) {
        return {
            loaded: true,
            data: config
        };
    }
}
exports.BootloaderEngine = BootloaderEngine;
