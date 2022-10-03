import { Node } from '../../Nodes/Node';
import { NodeEvaluationType } from './NodeEvaluationType';

export class NodeEvaluationEvent {
  constructor(
    public node: Node,
    public nodeEvaluationType: NodeEvaluationType,
    public async: boolean
  ) {}
}
