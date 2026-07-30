$Root="D:\KVR-Core"

@'
import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as yaml from "yaml";

@Injectable()
export class SpecLoader{

    load(file:string){

        const text=fs.readFileSync(file,"utf8");

        if(file.endsWith(".yaml") || file.endsWith(".yml") || file.endsWith(".kvr")){
            return yaml.parse(text);
        }

        return JSON.parse(text);

    }

}
'@ | Set-Content "$Root\src\spec\spec.loader.ts"

Write-Host "[OK] spec.loader.ts"