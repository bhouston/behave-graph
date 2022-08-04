import { GraphTypeRegistry } from '../../../../dist/lib/index';
import SetNodeBoolean from './Actions/SetNodeBoolean';
import SetNodeVector3 from './Actions/SetNodeVector3';
import NodeClick from './Events/NodeClick';
import GetNodeBoolean from './Queries/GetNodeBoolean';
import GetNodeVector3 from './Queries/GetNodeVector3';

export default function registerThreeNodes(registry: GraphTypeRegistry) {
  // events

  registry.registerNodeType('event/nodeClick', () => new NodeClick());

  // actions

  registry.registerNodeType('action/setNodeVisible', () => new SetNodeBoolean('action/setNodeVisible', 'visibility'));
  registry.registerNodeType('action/setNodeRotation', () => new SetNodeVector3('action/setNodeRotation', 'rotation'));
  registry.registerNodeType('action/setNodeTranslation', () => new SetNodeVector3('action/setNodeTranslation', 'translation'));
  registry.registerNodeType('action/setNodeScale', () => new SetNodeVector3('action/setNodeScale', 'scale'));

  // queries

  registry.registerNodeType('query/getNodeRotation', () => new GetNodeVector3('logic/getNodeRotation', 'rotation'));
  registry.registerNodeType('query/getNodeTranslation', () => new GetNodeVector3('logic/getNodeTranslation', 'translation'));
  registry.registerNodeType('query/getNodeScale', () => new GetNodeVector3('logic/getNodeScale', 'scale'));
  registry.registerNodeType('query/getNodeVisibility', () => new GetNodeBoolean('logic/getNodeVisibility', 'visibility'));

  return registry;
}
