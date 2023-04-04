import { IGraphApi } from '@behave-graph/core';

import { IScene } from './Abstractions/IScene';

export const sceneDepdendencyKey = 'scene';

export const getSceneDependencey = (
  getDependency: IGraphApi['getDependency']
) => getDependency<IScene>(sceneDepdendencyKey);
