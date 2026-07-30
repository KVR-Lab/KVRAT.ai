import { Injectable } from '@nestjs/common';

import { HealthService } from '../system/health.service';

import { SchedulerService } from '../scheduler/scheduler.service';



@Injectable()
export class LifecycleService {



constructor(

private readonly health:HealthService,

private readonly scheduler:SchedulerService

){}





boot()
{

const health = this.health.check();



return {

status:'booted',

health,

scheduler:'ready',

time:new Date()

};


}




startTask(
task:any
)
{

return this.scheduler.schedule(task);

}



}
