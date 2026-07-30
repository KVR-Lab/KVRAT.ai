
export class TaskRouter {

    route(task:any){

        return {
            task,
            target:"agent"
        };

    }

}
