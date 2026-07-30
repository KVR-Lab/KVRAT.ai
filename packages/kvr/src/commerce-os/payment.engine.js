"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentEngine = void 0;
class PaymentEngine {
    execute(input) {
        return {
            engine: "payment",
            success: true,
            data: input
        };
    }
}
exports.PaymentEngine = PaymentEngine;
