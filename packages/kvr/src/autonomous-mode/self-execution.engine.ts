export class SelfExecutionEngine {

    execute(task:any){

        return {
            executed:true,
            task
        };

    }

}