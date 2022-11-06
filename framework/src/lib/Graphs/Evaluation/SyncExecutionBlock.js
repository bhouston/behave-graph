"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncExecutionBlock = void 0;
const Assert_js_1 = require("../../Diagnostics/Assert.js");
const Link_js_1 = require("../../Nodes/Link.js");
const NodeEvalContext_js_1 = require("../../Nodes/NodeEvalContext.js");
class SyncExecutionBlock {
    constructor(graphEvaluator, nextEval, syncEvaluationCompletedListener = undefined) {
        this.graphEvaluator = graphEvaluator;
        this.nextEval = nextEval;
        this.syncEvaluationCompletedListenerStack = [];
        this.graph = graphEvaluator.graph;
        if (syncEvaluationCompletedListener !== undefined) {
            this.syncEvaluationCompletedListenerStack.push(syncEvaluationCompletedListener);
        }
    }
    // NOTE: This is a simplistic recursive and wasteful approach.
    // Is is optimal for a tree, but can do a lot of duplicate evaluations in dense graphs.
    // It will also get stuck in a recursive loop when there are loops in the graph.
    // TODO: Replace with initial traversal to extract sub DAG, order it, and evaluate each node once.
    resolveInputValueFromSocket(inputSocket) {
        if (inputSocket.valueTypeName === 'flow') {
            throw new Error(`can not resolve input values for Eval input sockets: ${inputSocket.name}`);
        }
        // if it has no links, return the immediate value
        if (inputSocket.links.length === 0) {
            //Logger.verbose(
            //  `returning value on input socket as it has no links: ${inputSocket.value}`
            // );
            // if not set, use the default value for this valueType
            if (inputSocket.value === undefined) {
                return this.graph.registry.values
                    .get(inputSocket.valueTypeName)
                    .creator();
            }
            return inputSocket.value;
        }
        if (inputSocket.links.length > 1) {
            throw new Error(`input socket has too many links: ${inputSocket.name} has ${inputSocket.links.length} links`);
        }
        const upstreamLink = inputSocket.links[0];
        // if upstream node is an eval, we just return its last value.
        const upstreamNode = this.graph.nodes[upstreamLink.nodeId];
        // what is inputSocket connected to?
        const upstreamOutputSocket = upstreamNode.getOutputSocket(upstreamLink.socketName);
        if (upstreamNode.flow) {
            //Logger.verbose(`upstreamNode is a flow node: ${upstreamNode.typeName}`);
            // eslint-disable-next-line no-param-reassign
            inputSocket.value = upstreamOutputSocket.value;
            return upstreamOutputSocket.value;
        }
        // resolve all inputs for the upstream node (this is where the recursion happens)
        // TODO: This is a bit dangerous as if there are loops in the graph, this will blow up the stack
        upstreamNode.inputSockets.forEach((upstreamInputSocket) => {
            //Logger.verbose(
            //  `recursively tracing input sockets: ${upstreamInputSocket.name}`
            //);
            // eslint-disable-next-line no-param-reassign
            this.resolveInputValueFromSocket(upstreamInputSocket);
        });
        const context = new NodeEvalContext_js_1.NodeEvalContext(this, upstreamNode);
        context.evalImmediate();
        // get the output value we wanted.
        // eslint-disable-next-line no-param-reassign
        inputSocket.value = upstreamOutputSocket.value;
        return inputSocket.value;
    }
    // this is syncCommit.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    commit(outputFlowSocket, syncEvaluationCompletedListener = undefined) {
        Assert_js_1.Assert.mustBeTrue(this.nextEval === null);
        const node = this.graph.nodes[outputFlowSocket.nodeId];
        const outputSocket = node.getOutputSocket(outputFlowSocket.socketName);
        if (outputSocket.links.length > 1) {
            throw new Error('invalid for an output flow socket to have multiple downstream links:' +
                `${node.description.typeName}.${outputSocket.name} has ${outputSocket.links.length} downlinks`);
        }
        if (outputSocket.links.length === 1) {
            const link = outputSocket.links[0];
            if (link === undefined) {
                throw new Error('link must be defined');
            }
            this.nextEval = link;
        }
        if (syncEvaluationCompletedListener !== undefined) {
            this.syncEvaluationCompletedListenerStack.push(syncEvaluationCompletedListener);
        }
    }
    // returns the number of new execution steps created as a result of this one step
    executeStep() {
        // pop the next node off the queue
        const link = this.nextEval;
        this.nextEval = null;
        // nothing waiting, thus go back and start to evaluate any callbacks, in stack order.
        if (link === null) {
            if (this.syncEvaluationCompletedListenerStack.length === 0) {
                return false;
            }
            const awaitingCallback = this.syncEvaluationCompletedListenerStack.pop();
            if (awaitingCallback === undefined) {
                throw new Error('awaitingCallback is empty');
            }
            awaitingCallback();
            return true;
        }
        const node = this.graph.nodes[link.nodeId];
        // first resolve all input values
        // flow socket is set to true for the one flowing in, while all others are set to false.
        node.inputSockets.forEach((inputSocket) => {
            //Logger.verbose(`scanning input socket: ${inputSocket.name}`);
            if (inputSocket.valueTypeName !== 'flow') {
                // eslint-disable-next-line no-param-reassign
                //Logger.verbose(
                //  `resolving input value for non-flow socket: ${inputSocket.name}`
                //);
                this.resolveInputValueFromSocket(inputSocket);
            }
            else {
                // eslint-disable-next-line no-param-reassign
                inputSocket.value = inputSocket.name === link.socketName; // is this required?  if there are multiple input flows, yes it is.
            }
        });
        const context = new NodeEvalContext_js_1.NodeEvalContext(this, node);
        context.evalFlow();
        // Auto-commit if no existing commits and no promises waiting.
        if (context.numCommits === 0 && !context.asyncPending) {
            // ensure this is auto-commit compatible.
            let numFlowOutputs = 0;
            node.outputSockets.forEach((outputSocket) => {
                if (outputSocket.valueTypeName === 'flow') {
                    numFlowOutputs++;
                }
            });
            if (numFlowOutputs !== 1) {
                throw new Error(`can not use auto-commit if there are multiple flow outputs, number of outputs is ${numFlowOutputs} on ${node.description.typeName}`);
            }
            node.outputSockets.forEach((outputSocket) => {
                if (outputSocket.valueTypeName === 'flow') {
                    this.commit(new Link_js_1.Link(link.nodeId, outputSocket.name));
                }
            });
        }
        return true;
    }
}
exports.SyncExecutionBlock = SyncExecutionBlock;
