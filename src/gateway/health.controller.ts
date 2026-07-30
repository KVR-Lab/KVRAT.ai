import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {

@Get()
check(){

return {
status:"ok",
service:"KVR-Core",
agent:true,
memory:true,
runtime:true,
time:new Date()
};

}

}