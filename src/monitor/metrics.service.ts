import { Injectable } from '@nestjs/common';



@Injectable()
export class MetricsService {



private metrics:any[] = [];



record(
name:string,
value:any
)
{

this.metrics.push({

name,

value,

time:new Date()

});

}



all()
{

return this.metrics;

}



}
