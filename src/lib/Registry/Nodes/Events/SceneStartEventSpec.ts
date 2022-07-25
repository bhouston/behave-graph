import NodeSpec from './Nodes/Spec/NodeSpec';
import EvalSocketSpec from './Sockets/Spec/EvalSocketSpec';

// TODO: Figure out how to force the evaluation of these from the outside.
// TODO: Figure out how to set values for the outputs in a consistent way.  Add to context?  Have a set of output values pre-specified when you trigger it?
// QQ: Should one just trigger its outputs directly rather than even evaluating it?

export class SceneStartEventSpec extends NodeSpec {
  constructor() {
    super(
      'events',
      'sceneStart',
      [],
      [new EvalSocketSpec()],
      (context, inputs) => new Map<string, any>().set('eval', true)
    );
  }
}
