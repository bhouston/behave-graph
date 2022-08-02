import NodeRegistry from '../NodeRegistry';
import SetNodeBoolean from './Actions/SetNodeBoolean';
import SetNodeVector3 from './Actions/SetNodeVector3';
import NodeClick from './Events/NodeClick';
import GetNodeBoolean from './Queries/GetNodeBoolean';
import GetNodeVector3 from './Queries/GetNodeVector3';

export default function registerThreeNodes(nodeRegistry: NodeRegistry) {
  // events

  nodeRegistry.add('event/nodeClick', () => new NodeClick());

  // actions

  nodeRegistry.add('action/setNodeVisible', () => new SetNodeBoolean('action/setNodeVisible', 'visibility'));
  nodeRegistry.add('action/setNodeRotation', () => new SetNodeVector3('action/setNodeRotation', 'rotation'));
  nodeRegistry.add('action/setNodeTranslation', () => new SetNodeVector3('action/setNodeTranslation', 'translation'));
  nodeRegistry.add('action/setNodeScale', () => new SetNodeVector3('action/setNodeScale', 'scale'));

  // queries

  nodeRegistry.add('query/getNodeRotation', () => new GetNodeVector3('logic/getNodeRotation', 'rotation'));
  nodeRegistry.add('query/getNodeTranslation', () => new GetNodeVector3('logic/getNodeTranslation', 'translation'));
  nodeRegistry.add('query/getNodeScale', () => new GetNodeVector3('logic/getNodeScale', 'scale'));
  nodeRegistry.add('query/getNodeVisibility', () => new GetNodeBoolean('logic/getNodeVisibility', 'visibility'));

  return nodeRegistry;
}
