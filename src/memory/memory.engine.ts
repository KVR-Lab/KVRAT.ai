import { Injectable } from '@nestjs/common';

import { MemoryStore } from './memory.store';



@Injectable()
export class MemoryEngine {



    constructor(

        private readonly store:MemoryStore

    ){}





    remember(
        data:any
    )
    {

        this.store.save(data);


        return {

            status:"memory.saved",

            data

        };

    }





    recall(
        query:string
    )
    {

        return this.store.recall(query);

    }





    context()
    {

        return this.store.all();

    }



}
