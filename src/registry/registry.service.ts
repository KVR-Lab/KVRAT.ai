import { RegistryStore } from './store/registry.store';


export class RegistryService {


    private readonly store =
        new RegistryStore();



    register(
        name:string,
        value:any
    ){

        this.store.register(
            name,
            value
        );

    }



    get(name:string){

        return this.store.resolve(name);

    }



    list(){

        return this.store.list();

    }


}
