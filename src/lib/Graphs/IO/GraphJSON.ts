import { Metadata } from '../Metadata';

export type LinkJSON = { nodeId: string; socket: string };

export type InputJSON = {
  value?: string;
  links?: LinkJSON[];
}

export type NodeJSON = {
  label?: string;
  type: string;
  id: string;
  inputs?: {
    [key: string]: InputJSON;
  };
  metadata?: Metadata;
};

export type GraphJSON = {
  name?: string;
  nodes: NodeJSON[];
  metadata?: Metadata;
}
