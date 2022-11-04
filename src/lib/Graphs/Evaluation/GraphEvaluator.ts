/* eslint-disable space-in-parens */

import { EventEmitter } from '../../Events/EventEmitter.js';
import { AsyncNode } from '../../Nodes/AsyncNode.js';
import { EventNode } from '../../Nodes/EventNode.js';
import { Link } from '../../Nodes/Link.js';
import { sleep } from '../../sleep.js';
import { Graph } from '../Graph.js';
import { NodeEvaluationEvent } from './NodeEvaluationEvent.js';
import { SyncExecutionBlock } from './SyncExecutionBlock.js';

export class GraphEvaluator {
  // tracking the next node+input socket to execute.
  private readonly executionBlockQueue: SyncExecutionBlock[] = [];
  public readonly asyncFlowNodes: AsyncNode[] = [];
  public readonly eventFlowNodes: EventNode[] = [];
  public readonly onNodeEvaluation = new EventEmitter<NodeEvaluationEvent>();

  constructor(public readonly graph: Graph) {
    // run all event nodes on startup.
    Object.values(this.graph.nodes).forEach((node) => {
      if (node instanceof EventNode) {
        this.executionBlockQueue.push(
          new SyncExecutionBlock(this, new Link(node.id, ''))
        );
      }
    });
  }

  // asyncCommit
  asyncCommit(
    outputFlowSocket: Link,
    syncEvaluationCompletedListener: (() => void) | undefined
  ) {
    const node = this.graph.nodes[outputFlowSocket.nodeId];
    const outputSocket = node.outputSockets.find(
      (socket) => socket.name === outputFlowSocket.socketName
    );
    if (outputSocket === undefined) {
      throw new Error(`no socket with the name ${outputFlowSocket.socketName}`);
    }
    if (outputSocket.links.length > 1) {
      throw new Error(
        'invalid for an output flow socket to have multiple downstream links:' +
          `${node.description.typeName}.${outputSocket.name} has ${outputSocket.links.length} downlinks`
      );
    }
    if (outputSocket.links.length === 1) {
      const syncExecutionBlock = new SyncExecutionBlock(
        this,
        outputSocket.links[0],
        syncEvaluationCompletedListener
      );
      this.executionBlockQueue.push(syncExecutionBlock);
    }
  }

  // NOTE: This does not execute all if there are promises.
  executeAllSync(limitInSeconds = 100, limitInSteps = 100000000): number {
    const startDateTime = Date.now();
    let elapsedSeconds = 0;
    let elapsedSteps = 0;
    while (
      elapsedSteps < limitInSteps &&
      elapsedSeconds < limitInSeconds &&
      this.executionBlockQueue.length > 0
    ) {
      const currentExecutionBlock = this.executionBlockQueue[0];
      const localExecutionSteps = currentExecutionBlock.executeStep();
      if (localExecutionSteps < 0) {
        // remove first element
        this.executionBlockQueue.shift();
      }
      elapsedSeconds = (Date.now() - startDateTime) * 0.001;
      if (localExecutionSteps > 0) {
        elapsedSteps += localExecutionSteps;
      }
    }
    return elapsedSteps;
  }

  async executeAllAsync(
    limitInSeconds = 100,
    limitInSteps = 100000000
  ): Promise<number> {
    const startDateTime = Date.now();
    let elapsedSteps = 0;
    let elapsedTime = 0;
    let iterations = 0;
    do {
      if (iterations > 0) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(0);
      }
      elapsedSteps += this.executeAllSync(
        limitInSeconds - elapsedTime,
        limitInSteps - elapsedSteps
      );
      elapsedTime = (Date.now() - startDateTime) * 0.001;
      iterations += 1;
    } while (
      (this.asyncFlowNodes.length > 0 || this.executionBlockQueue.length > 0) &&
      elapsedTime < limitInSeconds &&
      elapsedSteps < limitInSteps
    );

    return elapsedSteps;
  }
}
