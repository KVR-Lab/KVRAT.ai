import { Injectable } from '@nestjs/common';


@Injectable()
export class KnowledgeStore {



    private documents:any[] = [];



    add(
        document:any
    )
    {

        this.documents.push(document);

    }



    search(
        query:string
    )
    {

        return this.documents.filter(

            doc =>
            JSON.stringify(doc)
            .toLowerCase()
            .includes(
                query.toLowerCase()
            )

        );

    }



    all()
    {

        return this.documents;

    }


}
