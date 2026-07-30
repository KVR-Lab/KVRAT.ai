import { Module } from "@nestjs/common";

import { ToolRegistry } from "./tool.registry";
import { ToolRouter } from "./tool.router";
import { ToolController } from "./tool.controller";

import { FileTool } from "./builtin/file.tool";
import { TerminalTool } from "./builtin/terminal.tool";
import { GitTool } from "./builtin/git.tool";


@Module({

controllers:[
ToolController
],

providers:[
ToolRegistry,
ToolRouter,
FileTool,
TerminalTool,
GitTool
],

exports:[
ToolRegistry,
ToolRouter
]

})
export class ToolModule{}