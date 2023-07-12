import { IGraphApi } from '@behave-graph/core';

import { IScene } from './Abstractions/IScene.js';

export const sceneDependencyKey = 'scene';

export const getSceneDependency = (
  getDependency: IGraphApi['getDependency']
): IScene => getDependency<IScene>(sceneDependencyKey) as IScene;
