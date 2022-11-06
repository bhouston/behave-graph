"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEvalContext = void 0;
const EventEmitter_js_1 = require("../Events/EventEmitter.js");
const NodeEvaluationEvent_js_1 = require("../Graphs/Evaluation/NodeEvaluationEvent.js");
const NodeEvaluationType_js_1 = require("../Graphs/Evaluation/NodeEvaluationType.js");
const Link_js_1 = require("./Link.js");
// Purpose:
//  - Avoid nodes having to access globals to reference the scene or trigger loaders.
//  - Everything should be accessible via this context.
// Q: Should I store the promises in this structure?  Probably.
class NodeEvalContext {
    constructor(syncExecutionBlock, node) {
        this.syncExecutionBlock = syncExecutionBlock;
        this.node = node;
        this.onAsyncCancelled = new EventEmitter_js_1.EventEmitter();
        this.cachedInputValues = {}; // TODO: figure out if this is really needed
        this.cachedOutputValues = {}; // TODO: figure out if this is really needed
        this.asyncPending = false;
        this.numCommits = 0;
        this.graphEvaluator = syncExecutionBlock.graphEvaluator;
        this.graph = this.graphEvaluator.graph;
    }
    begin() {
        // Assert.mustBeTrue(this.node.async === true);
        if (this.node.interruptibleAsync) {
            this.graphEvaluator.interruptibleAsyncNodes.push(this.node);
        }
        else {
            this.graphEvaluator.asyncNodes.push(this.node);
        }
        this.asyncPending = true;
        this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent_js_1.NodeEvaluationEvent(this.node, NodeEvaluationType_js_1.NodeEvaluationType.Flow, true));
    }
    cancel() {
        //Assert.mustBeTrue(this.node.async === true);
        //Assert.mustBeTrue(this.asyncPending === true);
        this.onAsyncCancelled.emit();
        this.finish();
    }
    finish() {
        //Assert.mustBeTrue(this.node.async === true);
        //Assert.mustBeTrue(this.asyncPending === true);
        if (this.node.interruptibleAsync) {
            const index = this.graphEvaluator.interruptibleAsyncNodes.indexOf(this.node);
            this.graphEvaluator.interruptibleAsyncNodes.splice(index, 1);
        }
        else {
            const index = this.graphEvaluator.asyncNodes.indexOf(this.node);
            this.graphEvaluator.asyncNodes.splice(index, 1);
        }
        this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent_js_1.NodeEvaluationEvent(this.node, NodeEvaluationType_js_1.NodeEvaluationType.None, false));
    }
    evalFlow() {
        // confirm assumptions for an immediate evaluation
        //Assert.mustBeTrue(
        //  this.node.flow,
        //  'can not use evalFlow on non-Flow nodes, use evalImmediate instead'
        //);
        if (this.node.async) {
            this.begin();
        }
        else {
            this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent_js_1.NodeEvaluationEvent(this.node, NodeEvaluationType_js_1.NodeEvaluationType.Flow, false));
        }
        // read inputs all at once to avoid async inconsistencies.
        this.readInputs();
        this.node.evalFunc(this);
        if (!this.node.async) {
            this.writeOutputs(); // TODO: replace this with commit(), no need for this overlapping duplicate codex
            this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent_js_1.NodeEvaluationEvent(this.node, NodeEvaluationType_js_1.NodeEvaluationType.None, false));
        }
    }
    evalImmediate() {
        // confirm assumptions for an immediate evaluation
        if (this.node.flow) {
            throw new Error('can not evalImmediate on Flow nodes, use evalFlow instead');
        }
        this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent_js_1.NodeEvaluationEvent(this.node, NodeEvaluationType_js_1.NodeEvaluationType.Immediate, false));
        // read inputs all at once to avoid async inconsistencies.
        this.readInputs();
        this.node.evalFunc(this);
        // confirm assumptions for immediate evaluation.
        //Assert.mustBeTrue(
        //  !this.node.async,
        //  'evalImmediate can not handle evalPromise nodes, use evalFlow instead'
        //);
        this.writeOutputs();
        this.graphEvaluator.onNodeEvaluation.emit(new NodeEvaluationEvent_js_1.NodeEvaluationEvent(this.node, NodeEvaluationType_js_1.NodeEvaluationType.None, false));
    }
    readInputs() {
        // cache all input values - required for proper async operation?  I think so.
        // Maybe not in loops where it wants to check inputs? Or only when there is a new eval?
        this.node.inputSockets.forEach((socket) => {
            this.cachedInputValues[socket.name] = socket.value;
        });
    }
    writeOutputs() {
        // this writes all output values to either a defined or undefined value.  Thus it resets whatever was there before
        // this feels like the correct behavior.
        this.node.outputSockets.forEach((socket) => {
            // eslint-disable-next-line no-param-reassign
            socket.value = this.cachedOutputValues[socket.name];
        });
    }
    getCustomEvent(customEventId) {
        if (!(customEventId in this.graph.customEvents)) {
            throw new Error(`can not find customEvent with the id ${customEventId}`);
        }
        return this.graph.customEvents[customEventId];
    }
    getVariable(variableId) {
        if (!(variableId in this.graph.variables)) {
            throw new Error(`can not find variable with the id ${variableId}`);
        }
        return this.graph.variables[variableId];
    }
    // TODO: this may want to cache the values on the creation of the NodeEvalContext
    // for re-entrant async operations, otherwise the inputs may change during operation.
    readInput(inputName) {
        const inputSocket = this.node.inputSockets.find((socket) => socket.name === inputName);
        if (inputSocket === undefined) {
            throw new Error(`can not find input socket with name ${inputName}`);
        }
        return this.cachedInputValues[inputName];
    }
    writeOutput(outputName, value) {
        const outputSocket = this.node.outputSockets.find((socket) => socket.name === outputName);
        if (outputSocket === undefined) {
            throw new Error(`can not find output socket with name ${outputName} on node of type ${this.node.description.typeName}`);
        }
        if (outputSocket.valueTypeName === 'flow') {
            throw new Error(`can not set the value of Flow output socket ${outputName}, use commit() instead`);
        }
        this.cachedOutputValues[outputName] = value;
    }
    // TODO: convert this to return a promise always.  It is up to the user to wait on it.
    commit(downstreamFlowSocketName, syncEvaluationCompletedListener = undefined) {
        this.numCommits++;
        this.writeOutputs();
        if (this.node.async) {
            this.graphEvaluator.asyncCommit(new Link_js_1.Link(this.node.id, downstreamFlowSocketName), syncEvaluationCompletedListener);
        }
        else {
            this.syncExecutionBlock.commit(new Link_js_1.Link(this.node.id, downstreamFlowSocketName), syncEvaluationCompletedListener);
        }
    }
}
exports.NodeEvalContext = NodeEvalContext;
