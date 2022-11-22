import { Easing, EasingFunctions, EasingModes } from '../../../Easing';
import { Engine } from '../../../Execution/Engine';
import { Graph } from '../../../Graphs/Graph';
import { AsyncNode } from '../../../Nodes/AsyncNode';
import { NodeDescription } from '../../../Nodes/Registry/NodeDescription';
import { Socket } from '../../../Sockets/Socket';
import { toCamelCase } from '../../../toCamelCase';
import { ILifecycleEventEmitter } from '../../Core/Abstractions/ILifecycleEventEmitter';
import { IScene } from '../Abstractions/IScene';

export class EaseSceneProperty extends AsyncNode {
  public static GetDescriptions(
    scene: IScene,
    lifecycleEventEmitter: ILifecycleEventEmitter,
    ...valueTypeNames: string[]
  ) {
    return valueTypeNames.map(
      (valueTypeName) =>
        new NodeDescription(
          `scene/ease/${valueTypeName}`,
          'Action',
          `Ease Scene ${toCamelCase(valueTypeName)}`,
          (description, graph) =>
            new EaseSceneProperty(
              description,
              graph,
              valueTypeName,
              scene,
              lifecycleEventEmitter
            )
        )
    );
  }

  constructor(
    description: NodeDescription,
    graph: Graph,
    public readonly valueTypeName: string,
    private readonly scene: IScene,
    private readonly lifecycleEventEmitter: ILifecycleEventEmitter
  ) {
    super(
      description,
      graph,
      [
        new Socket('flow', 'flow'),
        new Socket('string', 'jsonPath'),
        new Socket(valueTypeName, 'value'),
        new Socket(
          'string',
          'easingFunction',
          'linear',
          undefined,
          Object.keys(EasingFunctions)
        ),
        new Socket(
          'string',
          'easingMode',
          'inOut',
          undefined,
          Object.keys(EasingModes)
        ),
        new Socket('float', 'easeDuration'),
        new Socket('flow', 'cancel')
      ],
      [new Socket('flow', 'flow')]
    );
  }

  private targetValue: any = undefined;
  private remainingDuration = 0;
  private easing: Easing = EasingFunctions['linear'];
  private onTick: (() => void) | undefined = undefined;

  triggered(
    engine: Engine,
    triggeringSocketName: string,
    finished: () => void
  ) {
    if (triggeringSocketName === 'cancel') {
      this.dispose();
      finished();
      return;
    }

    // if existing ease in progress, do nothing
    if (this.remainingDuration > 0) {
      return;
    }

    this.targetValue = this.readInput('value');
    this.remainingDuration = this.readInput<number>('duration');
    const easingFunction =
      EasingFunctions[this.readInput('easingFunction') as string];
    const easingMode = EasingModes[this.readInput('easingMode') as string];
    this.easing = easingMode(easingFunction);

    const updateOnTick = () => {
      const easedValue = this.targetValue;
      // TODO: figure out how to interpolate this value in a type safe way.

      this.scene.setProperty(
        this.readInput('jsonPath'),
        this.valueTypeName,
        easedValue
      );

      if (this.remainingDuration <= 0) {
        this.dispose();
        engine.commitToNewFiber(this, 'flow');
        finished();
      }
    };

    this.onTick = updateOnTick;
    this.lifecycleEventEmitter.tickEvent.addListener(this.onTick);
  }

  dispose() {
    this.remainingDuration = 0;
    if (this.onTick !== undefined) {
      this.lifecycleEventEmitter.tickEvent.removeListener(this.onTick);
      this.onTick = undefined;
    }
  }
}
