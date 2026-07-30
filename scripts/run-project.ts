import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";
import { ProjectRunner } from "../src/build/project.runner";

(async()=>{

    const app=await NestFactory.createApplicationContext(AppModule);

    const runner=app.get(ProjectRunner);

    await runner.run(process.argv[2]);

    await app.close();

})();
