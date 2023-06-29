import { Assert } from '../../../Diagnostics/Assert.js';
import {
  makeEventNodeDefinition,
  NodeCategory
} from '../../../Nodes/NodeDefinitions.js';
import { IScene } from '../Abstractions/IScene.js';

type State = {
  jsonPath?: string | undefined;
  handleNodeClick?: ((jsonPath: string) => void) | undefined;
};

const initialState = (): State => ({});

// very 3D specific.
export const OnSceneNodeClick = makeEventNodeDefinition({
  typeName: 'scene/nodeClick',
  category: NodeCategory.Event,
  in: {
    jsonPath: 'string'
  },
  out: {
    flow: 'flow'
  },
  initialState: initialState(),
  init: ({ read, commit, graph: { getDependency } }) => {
    const handleNodeClick = () => {
      commit('flow');
    };

    const jsonPath = read<string>('jsonPath');

    const scene = getDependency<IScene>('scene');
    scene.addOnClickedListener(jsonPath, handleNodeClick);

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
    scene.removeOnClickedListener(jsonPath, handleNodeClick);

    return {};
  }
});
