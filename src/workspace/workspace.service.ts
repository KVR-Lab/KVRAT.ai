import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class WorkspaceService {

    private readonly root =
        path.join(process.cwd(),"workspace");

    status(){

        return {
            workspace:this.root
        };

    }

    ensure(){

        fs.mkdirSync(this.root,{
            recursive:true
        });

    }

    findAll(){

        this.ensure();

        return fs.readdirSync(this.root,{
            withFileTypes:true
        }).map(x=>({

            name:x.name,

            type:x.isDirectory() ? "directory" : "file"

        }));

    }

    async write(
        relative:string,
        content:string
    ){

        this.ensure();

        const file =
            path.join(this.root,relative);

        fs.mkdirSync(
            path.dirname(file),
            {
                recursive:true
            }
        );

        fs.writeFileSync(
            file,
            content,
            "utf8"
        );

        return file;

    }

}
