
export class WorkflowEngine {

    start(workflow:any){

        return {
            workflow,
            status:"running"
        };

    }

}
