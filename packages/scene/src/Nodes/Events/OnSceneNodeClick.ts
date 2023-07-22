import {
  Assert,
  makeEventNodeDefinition,
  NodeCategory
} from '@behave-graph/core';

import { IScene } from '../../Abstractions/IScene.js';

type State = {
  jsonPath?: string | undefined;
  handleNodeClick?: ((jsonPath: string) => void) | undefined;
};

const initialState = (): State => ({});

// very 3D specific.
export const OnSceneNodeClick = makeEventNodeDefinition({
  typeName: 'scene/nodeClick',
  category: NodeCategory.Event,
  label: 'On Scene Node Click',
  in: {
    jsonPath: (_, graphApi) => {
      const scene = graphApi.getDependency<IScene>('IScene');

      return {
        valueType: 'string',
        choices: scene?.getRaycastableProperties()
      };
    }
  },
  out: {
    flow: 'flow'
  },
  initialState: initialState(),
  init: ({ read, commit, graph }) => {
    const handleNodeClick = () => {
      commit('flow');
    };

    const jsonPath = read<string>('jsonPath');

    const scene = graph.getDependency<IScene>('IScene');
    scene?.addOnClickedListener(jsonPath, handleNodeClick);

    const state: State = {
      handleNodeClick,
      jsonPath
    };

    return state;
  },
  dispose: ({
    state: { handleNodeClick, jsonPath },
    graph: { getDependency }
  }) => {
    Assert.mustBeTrue(handleNodeClick !== undefined);
    Assert.mustBeTrue(jsonPath !== undefined);

    if (!jsonPath || !handleNodeClick) return {};

    const scene = getDependency<IScene>('scene');
    scene?.removeOnClickedListener(jsonPath, handleNodeClick);

    return {};
  }
});
