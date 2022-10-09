import { Graph } from '../Graph';
import { validateGraphAcyclic } from './validateGraphAcyclic';
import { validateGraphLinks } from './validateGraphLinks';

export function validateGraph(graph: Graph): string[] {
  const errorList: string[] = [];
  errorList.push(...validateGraphAcyclic(graph), ...validateGraphLinks(graph));
  return errorList;
}
