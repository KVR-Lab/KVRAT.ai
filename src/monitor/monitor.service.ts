import { Injectable } from '@nestjs/common';

import { MetricsService } from './metrics.service';



@Injectable()
export class MonitorService {



constructor(

private readonly metrics:MetricsService

){}




status()
{

const result = {

system:'KVR',

runtime:'active',

agent:'active',

memory:'ready',

storage:'ready',

time:new Date()

};



this.metrics.record(

'health.status',

result

);



return result;

}



}
