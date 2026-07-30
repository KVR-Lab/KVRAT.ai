export class RegistryStore {


    private items = new Map<string,any>();


    register(
        name:string,
        value:any
    ){

        this.items.set(name,value);

    }


    resolve(name:string){

        return this.items.get(name);

    }


    list(){

        return Array.from(this.items.keys());

    }


}
