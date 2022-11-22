import { Metadata } from '../../Metadata';

export type ValueJSON = string | boolean | number;

export type LinkJSON = { nodeId: string; socket: string };

export type NodeParameterValueJSON = { value: ValueJSON };
export type NodeParameterLinkJSON = { link: LinkJSON };
export type NodeParameterJSON = NodeParameterValueJSON | NodeParameterLinkJSON;

export type NodeParametersJSON = {
  [key: string]: NodeParameterJSON;
};

export type FlowsJSON = {
  [key: string]: LinkJSON;
};

export type NodeJSON = {
  label?: string;
  type: string;
  id: string;

  parameters?: NodeParametersJSON;
  flows?: FlowsJSON;
  metadata?: Metadata;
};

export type VariableJSON = {
  label?: string;
  id: string;
  name: string;
  valueTypeName: string;
  initialValue: ValueJSON;
  metadata?: Metadata;
};

export type CustomEventParameterJSON = {
  name: string;
  valueTypeName: string;
  defaultValue: ValueJSON;
};

export type CustomEventJSON = {
  label?: string;
  id: string;
  name: string;
  parameters?: CustomEventParameterJSON[];
  metadata?: Metadata;
};

export type GraphJSON = {
  name?: string;
  nodes?: NodeJSON[];
  variables?: VariableJSON[];
  customEvents?: CustomEventJSON[];
  metadata?: Metadata;
};
