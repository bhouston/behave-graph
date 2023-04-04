import { GraphInstance } from '../Graph';
import { validateGraphAcyclic } from './validateGraphAcyclic';
import { validateGraphLinks } from './validateGraphLinks';

export function validateGraph(graph: GraphInstance): string[] {
  const errorList: string[] = [];
  errorList.push(
    ...validateGraphAcyclic(graph.nodes),
    ...validateGraphLinks(graph.nodes)
  );
  return errorList;
}
