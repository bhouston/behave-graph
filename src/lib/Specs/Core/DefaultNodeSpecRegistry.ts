import registerDefaultActions from './Actions';
import registerDefaultEvents from './Events';
import registerDefaultFlowControls from './FlowControl';
import registerDefaultLogic from './Logic';
import { NodeSpecRegistry } from './NodeSpecRegistry';
import registerDefaultQueries from './Queries';

export const GlobalNodeSpecRegistry = new NodeSpecRegistry();
registerDefaultActions(GlobalNodeSpecRegistry);
registerDefaultEvents(GlobalNodeSpecRegistry);
registerDefaultFlowControls(GlobalNodeSpecRegistry);
registerDefaultQueries(GlobalNodeSpecRegistry);
registerDefaultLogic(GlobalNodeSpecRegistry);
