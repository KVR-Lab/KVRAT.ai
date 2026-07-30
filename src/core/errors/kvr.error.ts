export class KvrError extends Error {

    constructor(message:string){

        super(message);

        this.name='KvrError';

    }

}
