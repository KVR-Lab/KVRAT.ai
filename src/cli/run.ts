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
