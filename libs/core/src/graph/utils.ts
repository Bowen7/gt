import { Graph } from './index';
import { Edge } from '../types';

export const postOrder = (graph: Graph, callback: (id: string) => void) => {
  const stack = graph.leaves;
  const visited = new Set<string>();
  while (stack.length) {
    const id = stack[stack.length - 1];
    const children = [...(graph.targetMap.get(id) ?? []).keys()] as string[];
    if (children.length === 0 || visited.has(id)) {
      stack.pop();
      callback(id);
      continue;
    }

    children.forEach((child) => stack.push(child));
    visited.add(id);
  }
};

export const traverseEdgesByRoots = (graph: Graph, roots: string[]) => {
  const visited = new Set<Edge>();
  const result: Edge[] = [];
  // TODO
  const queue = [...roots];
  while (queue.length > 0) {
    const id = queue.shift()!;
    const edges = graph.edges(id);
    edges.forEach((edge) => {
      if (!visited.has(edge)) {
        visited.add(edge);
        result.push(edge);
      }
    });
  }
  return result;
};
