import { Injectable } from "@nestjs/common";
import { SpecLoader } from "../spec/spec.loader";
import { GeneratorService } from "../generator/generator.service";

@Injectable()
export class ProjectRunner{

    private readonly loader=new SpecLoader();
    private readonly generator=new GeneratorService();

    run(file:string){

        const spec=this.loader.load(file);

        return this.generator.generate(spec);

    }

}
