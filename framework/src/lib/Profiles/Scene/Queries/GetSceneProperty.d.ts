import { Graph } from '../../../Graphs/Graph.js';
import { Node } from '../../../Nodes/Node.js';
import { NodeDescription } from '../../../Nodes/NodeDescription.js';
import { IScene } from '../Abstractions/IScene.js';
export declare class GetSceneProperty extends Node {
    private readonly scene;
    static GetDescriptions(scene: IScene, ...valueTypeNames: string[]): NodeDescription[];
    constructor(description: NodeDescription, graph: Graph, valueTypeName: string, scene: IScene);
}
//# sourceMappingURL=GetSceneProperty.d.ts.map