import { Injectable } from "@nestjs/common";

@Injectable()

export class AutonomousService{

    boot(){

        console.log("Autonomous Engine Started");

    }

}
