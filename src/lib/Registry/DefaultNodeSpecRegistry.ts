import registerDefaultActions from './Nodes/Actions';
import registerDefaultEvents from './Events';
import registerDefaultFlowControls from './FlowControl';
import registerDefaultLogic from './Logic';
import { NodeSpecRegistry } from './NodeSpecRegistry';
import registerDefaultQueries from './Nodes/Queries';

export const GlobalNodeSpecRegistry = new NodeSpecRegistry();
registerDefaultActions(GlobalNodeSpecRegistry);
registerDefaultEvents(GlobalNodeSpecRegistry);
registerDefaultFlowControls(GlobalNodeSpecRegistry);
registerDefaultQueries(GlobalNodeSpecRegistry);
registerDefaultLogic(GlobalNodeSpecRegistry);
å;
