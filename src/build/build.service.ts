import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class BuildService {

    status(){

        return {

            service:"build",
            ready:true,
            workspace:process.cwd()

        };

    }

    async write(file:string,content:string){

        const full = path.resolve(process.cwd(),file);

        fs.mkdirSync(path.dirname(full),{

            recursive:true

        });

        fs.writeFileSync(full,content,"utf8");

        return full;

    }

}
