$file = ".\src\events\bus\event.bus.ts"


$content = @"
import { KvrEvent } from '../event.interface';


export class EventBus {


    private events:KvrEvent[] = [];



    publish(
        event:KvrEvent
    ){

        this.events.push(event);

    }



    emit(
        event:KvrEvent
    ){

        this.publish(event);

    }



    getEvents(){

        return this.events;

    }


}
"@


Set-Content `
-Path $file `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] EventBus"