import Node from '../../Nodes/Node';
import { NodeEvaluationType } from './NodeEvaluationType';

export type EvaluationListener = (node: Node, nodeEvaluationType: NodeEvaluationType, async: boolean) => void;
