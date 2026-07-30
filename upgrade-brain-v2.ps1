$Root = "D:\kvr-core"
$Brain = Join-Path $Root "src\brain"

# ============================
# brain.service.ts
# ============================

@'
import { Injectable } from "@nestjs/common";
import { LlmGateway } from "../llm/llm.gateway";

@Injectable()
export class BrainService {

    constructor(
        private readonly llm: LlmGateway
    ) {}

    async think(plan:any){

        const prompt = JSON.stringify(plan,null,2);

        return await this.llm.chat(
            "ollama",
            prompt
        );

    }

}
'@ | Set-Content "$Brain\brain.service.ts"

# ============================
# brain.module.ts
# ============================

@'
import { Module } from "@nestjs/common";

import { BrainService } from "./brain.service";
import { LlmModule } from "../llm/llm.module";

@Module({

    imports:[
        LlmModule
    ],

    providers:[
        BrainService
    ],

    exports:[
        BrainService
    ]

})
export class BrainModule{}
'@ | Set-Content "$Brain\brain.module.ts"

Write-Host ""
Write-Host "===================================" -ForegroundColor Green
Write-Host "Brain V2 Installed Successfully" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green