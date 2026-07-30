import { RuntimeManager } from '../runtime/manager/runtime.manager';
import { RegistryService } from '../registry/registry.service';
import { EventBus } from '../events/bus/event.bus';


export const KVR_PROVIDERS = [

    RuntimeManager,

    RegistryService,

    EventBus

];

