"use strict";
/* eslint-disable space-in-parens */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphEvaluator = void 0;
const EventEmitter_js_1 = require("../../Events/EventEmitter.js");
const Link_js_1 = require("../../Nodes/Link.js");
const sleep_js_1 = require("../../sleep.js");
const SyncExecutionBlock_js_1 = require("./SyncExecutionBlock.js");
class GraphEvaluator {
    constructor(graph) {
        this.graph = graph;
        // tracking the next node+input socket to execute.
        this.executionBlockQueue = [];
        this.asyncNodes = [];
        this.interruptibleAsyncNodes = [];
        this.onNodeEvaluation = new EventEmitter_js_1.EventEmitter();
        Object.values(this.graph.nodes).forEach((node) => {
            if (node.evaluateOnStartup) {
                this.executionBlockQueue.push(new SyncExecutionBlock_js_1.SyncExecutionBlock(this, new Link_js_1.Link(node.id, '')));
            }
        });
    }
    // asyncCommit
    asyncCommit(outputFlowSocket, syncEvaluationCompletedListener) {
        const node = this.graph.nodes[outputFlowSocket.nodeId];
        const outputSocket = node.getOutputSocket(outputFlowSocket.socketName);
        if (outputSocket.links.length > 1) {
            throw new Error('invalid for an output flow socket to have multiple downstream links:' +
                `${node.description.typeName}.${outputSocket.name} has ${outputSocket.links.length} downlinks`);
        }
        if (outputSocket.links.length === 1) {
            const syncExecutionBlock = new SyncExecutionBlock_js_1.SyncExecutionBlock(this, outputSocket.links[0], syncEvaluationCompletedListener);
            this.executionBlockQueue.push(syncExecutionBlock);
        }
    }
    // NOTE: This does not execute all if there are promises.
    executeAllSync(limitInSeconds = 100, limitInSteps = 100000000) {
        const startDateTime = Date.now();
        let elapsedSeconds = 0;
        let elapsedSteps = 0;
        while (elapsedSteps < limitInSteps &&
            elapsedSeconds < limitInSeconds &&
            this.executionBlockQueue.length > 0) {
            const currentExecutionBlock = this.executionBlockQueue[0];
            if (!currentExecutionBlock.executeStep()) {
                // remove first element
                this.executionBlockQueue.shift();
            }
            elapsedSeconds = (Date.now() - startDateTime) * 0.001;
            elapsedSteps++;
        }
        return elapsedSteps;
    }
    async executeAllAsync(limitInSeconds = 100, limitInSteps = 100000000) {
        const startDateTime = Date.now();
        let elapsedSteps = 0;
        let elapsedTime = 0;
        let iterations = 0;
        do {
            if (iterations > 0) {
                // eslint-disable-next-line no-await-in-loop
                await (0, sleep_js_1.sleep)(0);
            }
            elapsedSteps += this.executeAllSync(limitInSeconds - elapsedTime, limitInSteps - elapsedSteps);
            elapsedTime = (Date.now() - startDateTime) * 0.001;
            iterations += 1;
        } while ((this.asyncNodes.length > 0 || this.executionBlockQueue.length > 0) &&
            elapsedTime < limitInSeconds &&
            elapsedSteps < limitInSteps);
        return elapsedSteps;
    }
}
exports.GraphEvaluator = GraphEvaluator;
