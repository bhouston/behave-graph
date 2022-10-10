import { CustomEvent } from '../Events/CustomEvent.js';
import { Metadata } from '../Metadata.js';
import { Node } from '../Nodes/Node.js';
import { Registry } from '../Registry.js';
import { Variable } from '../Variables/Variable.js';
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
