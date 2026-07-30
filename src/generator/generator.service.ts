import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class GeneratorService{

    generate(project:any){

        const root=project.output ?? "./generated";

        fs.mkdirSync(root,{recursive:true});

        if(project.folders){

            for(const folder of project.folders){

                fs.mkdirSync(path.join(root,folder),{recursive:true});

            }

        }

        if(project.files){

            for(const file of project.files){

                fs.writeFileSync(
                    path.join(root,file.path),
                    file.content ?? ""
                );

            }

        }

        return{
            status:"generated",
            output:root
        };

    }

}
