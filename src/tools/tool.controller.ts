import { Controller, Get, Post, Body } from "@nestjs/common";
import { ToolRegistry } from "./tool.registry";

@Controller("tools")
export class ToolController {

constructor(
private readonly registry:ToolRegistry
){}


@Get()
list(){
return this.registry.list();
}


@Post("execute")
execute(@Body() body:any){

const tool=this.registry.get(body.name);

if(!tool){
return {
success:false,
error:"Tool not found"
};
}

return tool(...(body.args ?? []));

}

}
