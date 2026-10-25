import { Controller, Get, Post, Body } from "@nestjs/common";
import { RequireExecutionKey } from '../security/execution-access.guard';
import { ToolRegistry } from "./tool.registry";

@RequireExecutionKey()
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
