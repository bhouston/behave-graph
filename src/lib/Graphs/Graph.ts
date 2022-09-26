import CustomEvent from '../Events/CustomEvent';
import Node from '../Nodes/Node';
import Registry from '../Registry';
import Variable from '../Variables/Variable';
import { Metadata } from './Metadata';
// Purpose:
//  - stores the node graph

export default class Graph {
  public name: string = '';
  public readonly nodes: { [id:string]: Node} = {};
  public readonly variables: { [id:string]: Variable } = {};
  public readonly customEvents: { [id:string]: CustomEvent} = {};
  public metadata: Metadata = {};

  constructor(public readonly registry: Registry) {
  }
}
