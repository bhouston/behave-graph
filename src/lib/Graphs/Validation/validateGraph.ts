import { Graph } from '../Graph.js';
import { validateGraphAcyclic } from './validateGraphAcyclic.js';
import { validateGraphLinks } from './validateGraphLinks.js';

export function validateGraph(graph: Graph): string[] {
  const errorList: string[] = [];
  errorList.push(...validateGraphAcyclic(graph), ...validateGraphLinks(graph));
  return errorList;
}
