import { CustomEvent } from '../Events/CustomEvent';
import { Metadata } from '../Metadata';
import { Node } from '../Nodes/Node';
import { Registry } from '../Registry';
import { Variable } from '../Variables/Variable';
// Purpose:
//  - stores the node graph

export class Graph {
  public name = '';
  public readonly nodes: { [id: string]: Node } = {};
  public readonly variables: { [id: string]: Variable } = {};
  public readonly customEvents: { [id: string]: CustomEvent } = {};
  public metadata: Metadata = {};

  constructor(public readonly registry: Registry) {}
}
