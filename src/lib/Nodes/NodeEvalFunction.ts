import NodeEvalContext from './NodeEvalContext';

export type NodeEvalFunction = (context: NodeEvalContext) => void | Promise<NodeEvalContext>;
