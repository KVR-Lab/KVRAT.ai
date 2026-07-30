export class RuntimeContext {

    private data = new Map<string, any>();


    set(key:string,value:any){

        this.data.set(key,value);

    }


    get(key:string){

        return this.data.get(key);

    }

}
