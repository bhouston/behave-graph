import { GraphInstance } from '../Graph.js';
import { validateGraphAcyclic } from './validateGraphAcyclic.js';
import { validateGraphLinks } from './validateGraphLinks.js';

export function validateGraph(graph: GraphInstance): string[] {
  const errorList: string[] = [];
  errorList.push(
    ...validateGraphAcyclic(graph.nodes),
    ...validateGraphLinks(graph.nodes)
  );
  return errorList;
}
