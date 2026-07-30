import { Injectable, OnModuleInit } from "@nestjs/common";
import { RuntimeLoop } from "./runtime.loop";

@Injectable()
export class RuntimeService implements OnModuleInit {

    constructor(
        private readonly loop: RuntimeLoop
    ){}

    async onModuleInit() {
        this.loop.start();
    }

    status() {
        return {
            running: true,
            service: "runtime",
            startedAt: new Date().toISOString()
        };
    }

}
