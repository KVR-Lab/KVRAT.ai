import { Injectable } from '@nestjs/common';

import { KnowledgeStore } from './knowledge.store';



@Injectable()
export class KnowledgeEngine {



    constructor(

        private readonly store:KnowledgeStore

    ){}




    remember(
        data:any
    )
    {

        this.store.add(data);


        return {

            status:"stored",

            data

        };

    }




    search(
        query:string
    )
    {

        return this.store.search(query);

    }




}
