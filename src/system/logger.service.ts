import { Injectable } from '@nestjs/common';



@Injectable()
export class LoggerService {



log(
message:string
)
{

console.log(
'[KVR]',
message
);

}



error(
message:string
)
{

console.error(
'[KVR ERROR]',
message
);

}


}
