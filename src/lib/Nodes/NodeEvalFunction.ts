import NodeEvalContext from './NodeEvalContext';

export type NodeEvalFunction = (context: NodeEvalContext, inputValues: Map<string, any>) => Map<string, any>;
