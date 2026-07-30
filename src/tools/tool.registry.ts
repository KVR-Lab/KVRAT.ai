import { Injectable } from "@nestjs/common";

import { FileTool } from "./builtin/file.tool";
import { TerminalTool } from "./builtin/terminal.tool";
import { GitTool } from "./builtin/git.tool";


@Injectable()
export class ToolRegistry {

private tools = new Map<string,Function>();

constructor(
 private readonly file:FileTool,
 private readonly terminal:TerminalTool,
 private readonly git:GitTool
){

this.register("file.read",this.file.read.bind(this.file));
this.register("file.write",this.file.write.bind(this.file));
this.register("file.list",this.file.list.bind(this.file));

this.register("terminal.run",this.terminal.run.bind(this.terminal));

this.register("git.status",this.git.status.bind(this.git));
this.register("git.branch",this.git.branch.bind(this.git));
this.register("git.log",this.git.log.bind(this.git));

}


register(name:string,fn:Function){
 this.tools.set(name,fn);
}


get(name:string){
 return this.tools.get(name);
}


list(){
 return [...this.tools.keys()];
}

}