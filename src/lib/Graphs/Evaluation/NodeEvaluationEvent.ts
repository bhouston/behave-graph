import { Node } from '../../Nodes/Node.js';
import { NodeEvaluationType } from './NodeEvaluationType.js';

export class NodeEvaluationEvent {
  constructor(
    public node: Node,
    public nodeEvaluationType: NodeEvaluationType,
    public async: boolean
  ) {}
}
