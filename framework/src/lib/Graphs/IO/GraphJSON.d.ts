import { Metadata } from '../../Metadata.js';
export declare type ValueJSON = string | boolean | number;
export declare type LinkJSON = {
    nodeId: string;
    socket: string;
};
export declare type NodeParameterValueJSON = {
    value: ValueJSON;
};
export declare type NodeParameterLinkJSON = {
    link: LinkJSON;
};
export declare type NodeParameterJSON = NodeParameterValueJSON | NodeParameterLinkJSON;
export declare type NodeParametersJSON = {
    [key: string]: NodeParameterJSON;
};
export declare type FlowsJSON = {
    [key: string]: LinkJSON;
};
export declare type NodeJSON = {
    label?: string;
    type: string;
    id: string;
    parameters?: NodeParametersJSON;
    flows?: FlowsJSON;
    metadata?: Metadata;
};
export declare type VariableJSON = {
    label?: string;
    id: string;
    name: string;
    valueTypeName: string;
    initialValue: ValueJSON;
    metadata?: Metadata;
};
export declare type CustomEventParameterJSON = {
    name: string;
    valueTypeName: string;
    defaultValue: ValueJSON;
};
export declare type CustomEventJSON = {
    label?: string;
    id: string;
    name: string;
    parameters?: CustomEventParameterJSON[];
    metadata?: Metadata;
};
export declare type GraphJSON = {
    name?: string;
    nodes?: NodeJSON[];
    variables?: VariableJSON[];
    customEvents?: CustomEventJSON[];
    metadata?: Metadata;
};
//# sourceMappingURL=GraphJSON.d.ts.map