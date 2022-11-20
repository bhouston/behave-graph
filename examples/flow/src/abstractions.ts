import { IScene } from '@behave-graph/core';
export type ResourceOption = {
  name: string;
  index: number;
};

export type ResourceProperties = {
  options: ResourceOption[];
  properties: string[];
};

export type ResourceTypes = 'nodes' | 'materials' | 'animations';

export type Properties = {
  nodes?: ResourceProperties;
  materials?: ResourceProperties;
  animations?: ResourceProperties;
};

export interface ISceneWithQueries extends IScene {
  getProperties: () => Properties;
}
