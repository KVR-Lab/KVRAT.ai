import { Injectable } from '@nestjs/common';



@Injectable()
export class StorageService {



private data:any[] = [];



save(
item:any
)
{

this.data.push({

...item,

savedAt:new Date()

});

}




all()
{

return this.data;

}




clear()
{

this.data = [];

}



}
