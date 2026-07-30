import { Injectable } from '@nestjs/common';



@Injectable()
export class MemoryStore {



    private memories:any[] = [];




    save(
        item:any
    )
    {

        this.memories.push({

            ...item,

            createdAt:
            new Date()

        });

    }





    recall(
        query:string
    )
    {

        return this.memories.filter(

            memory =>

            JSON.stringify(memory)
            .toLowerCase()
            .includes(
                query.toLowerCase()
            )

        );

    }




    all()
    {

        return this.memories;

    }


}
