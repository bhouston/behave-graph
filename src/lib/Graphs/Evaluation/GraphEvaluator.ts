/* eslint-disable space-in-parens */

import { Logger } from '../../Diagnostics/Logger';
import { EventEmitter } from '../../Events/EventEmitter';
import { EventListener } from '../../Events/EventListener';
import { Link } from '../../Nodes/Link';
import { Node } from '../../Nodes/Node';
import { sleep } from '../../sleep';
import { Graph } from '../Graph';
import { NodeEvaluationEvent } from './NodeEvaluationEvent';
import { SyncExecutionBlock } from './SyncExecutionBlock';

export class GraphEvaluator {
  // tracking the next node+input socket to execute.
  private readonly executionBlockQueue: SyncExecutionBlock[] = [];
  public readonly asyncNodes: Node[] = [];
  public readonly interruptibleAsyncNodes: Node[] = [];
  public readonly onNodeEvaluation = new EventEmitter<NodeEvaluationEvent>();

  constructor(public readonly graph: Graph) {
    Object.values(this.graph.nodes).forEach((node) => {
      if (node.evaluateOnStartup) {
        this.executionBlockQueue.push(
          new SyncExecutionBlock(this, new Link(node.id, ''))
        );
      }
    });
  }

  // asyncCommit
  asyncCommit(
    outputFlowSocket: Link,
    syncEvaluationCompletedListener: EventListener<void> | undefined
  ) {
    const node = this.graph.nodes[outputFlowSocket.nodeId];
    const outputSocket = node.getOutputSocket(outputFlowSocket.socketName);

    Logger.verbose(
      `GraphEvaluator: asyncCommit: ${node.typeName}.${outputSocket.name}`
    );

    if (outputSocket.links.length > 1) {
      throw new Error(
        'invalid for an output flow socket to have multiple downstream links:' +
          `${node.typeName}.${outputSocket.name} has ${outputSocket.links.length} downlinks`
      );
    }
    if (outputSocket.links.length === 1) {
      Logger.verbose(
        `GraphEvaluator: scheduling next flow node: ${outputSocket.links[0].nodeId}.${outputSocket.links[0].socketName}`
      );

      const syncExecutionBlock = new SyncExecutionBlock(
        this,
        outputSocket.links[0],
        syncEvaluationCompletedListener
      );
      this.executionBlockQueue.push(syncExecutionBlock);
    }
  }

  // NOTE: This does not execute all if there are promises.
  executeAll(stepLimit = 100000000): number {
    let stepsExecuted = 0;
    while (stepsExecuted < stepLimit && this.executionBlockQueue.length > 0) {
      const currentExecutionBlock = this.executionBlockQueue[0];
      if (!currentExecutionBlock.executeStep()) {
        // remove first element
        this.executionBlockQueue.shift();
      }
      stepsExecuted++;
    }
    return stepsExecuted;
  }

  async executeAllAsync(
    timeLimit = 100,
    stepLimit = 100000000
  ): Promise<number> {
    const startDateTime = Date.now();
    let stepsExecuted = 0;
    let elapsedTime = 0;
    let iterations = 0;
    do {
      if (iterations > 0) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(0);
      }
      stepsExecuted += this.executeAll(stepLimit);
      Logger.verbose(
        `this.nonBlockingAsyncNodes.length: ${this.interruptibleAsyncNodes.length}`
      );
      Logger.verbose(`this.asyncNodes.length: ${this.asyncNodes.length}`);
      Logger.verbose(
        `this.executionBlockQueue.length: ${this.executionBlockQueue.length}`
      );
      elapsedTime = (Date.now() - startDateTime) * 0.001;
      iterations += 1;
    } while (
      (this.asyncNodes.length > 0 || this.executionBlockQueue.length > 0) &&
      elapsedTime < timeLimit &&
      stepsExecuted < stepLimit
    );

    return stepsExecuted;
  }
}
