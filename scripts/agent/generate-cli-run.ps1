$Root="D:\KVR-Core"

@'
import { ProjectRunner } from "../runner/project.runner";

async function main(){

    const file=process.argv[2];

    if(!file){
        console.log("Usage: kvr run project.kvr");
        return;
    }

    const runner=new ProjectRunner();

    console.log(
        runner.run(file)
    );

}

main();
'@ | Set-Content "$Root\src\cli\run.ts"

Write-Host "[OK] src\cli\run.ts"

$pkg=Get-Content "$Root\package.json" -Raw

$pkg=$pkg.Replace(
'"release":"nest start"',
'"release":"nest start",
    "run:kvr":"tsx src/cli/run.ts"'
)

Set-Content "$Root\package.json" $pkg

Write-Host "[OK] package.json"
