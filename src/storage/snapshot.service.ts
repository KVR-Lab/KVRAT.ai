import { Injectable } from '@nestjs/common';

import { StorageService } from './storage.service';



@Injectable()
export class SnapshotService {



constructor(

private readonly storage:StorageService

){}



create()
{

return {

snapshot:

this.storage.all(),

createdAt:new Date()

};


}



}
