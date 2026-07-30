import { Injectable } from "@nestjs/common";
import { ToolRegistry } from "./tool.registry";

@Injectable()
export class ToolRouter{

constructor(private readonly registry:ToolRegistry){}

execute(name:string,...args:any[]){
const tool=this.registry.get(name);

if(!tool){
return {success:false,error:"Tool not found"};
}

return tool(...args);
}

}
