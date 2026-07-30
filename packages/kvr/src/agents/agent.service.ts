import { Injectable } from "@nestjs/common";

@Injectable()
export class AgentService{

    boot(){

        console.log("Agent System Started");

    }

}
