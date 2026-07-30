import { RuntimeContext } from '../context/runtime.context';


export class RuntimeManager {


    readonly context = new RuntimeContext();


    initialize(){

        return this.context;

    }


}
