import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as yaml from "yaml";

@Injectable()
export class ProjectSpecService {

    load(file:string){

        const text = fs.readFileSync(file,"utf8");

        return yaml.parse(text);

    }

}
