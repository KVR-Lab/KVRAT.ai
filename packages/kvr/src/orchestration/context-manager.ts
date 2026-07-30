
export class ContextManager {

    create(data:any){

        return {
            createdAt:new Date(),
            data
        };

    }

}
