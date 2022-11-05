import { NodeCategory } from '../../Nodes/NodeCategory.js';
import { ValueJSON } from './GraphJSON.js';
export declare type InputSocketSpecJSON = {
    name: string;
    valueType: string;
    defaultValue?: ValueJSON;
};
export declare type OutputSocketSpecJSON = {
    name: string;
    valueType: string;
};
export declare type NodeSpecJSON = {
    type: string;
    category: NodeCategory;
    inputs: InputSocketSpecJSON[];
    outputs: OutputSocketSpecJSON[];
};
//# sourceMappingURL=NodeSpecJSON.d.ts.map