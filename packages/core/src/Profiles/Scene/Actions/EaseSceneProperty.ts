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

  private initialValue: any = undefined;
  private targetValue: any = undefined;
  private duration = 0;
  private elapsedDuration = 0;
  private easing: Easing = EasingFunctions['linear'];
  private startTime = 0;
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
    if (this.elapsedDuration >= this.duration) {
      return;
    }

    this.initialValue = this.scene.getProperty(
      this.readInput('jsonPath'),
      this.valueTypeName
    );
    this.targetValue = this.readInput('value');
    this.duration = this.readInput<number>('duration');
    this.elapsedDuration = 0;
    this.startTime = Date.now();

    const easingFunction =
      EasingFunctions[this.readInput('easingFunction') as string];
    const easingMode = EasingModes[this.readInput('easingMode') as string];
    this.easing = easingMode(easingFunction);

    const updateOnTick = () => {
      const valueType = this.graph.registry.values.get(this.valueTypeName);
      this.elapsedDuration = (Date.now() - this.startTime) / 1000;

      const t = Math.min(this.elapsedDuration / this.duration, 1);
      const easedValue = valueType.lerp(
        this.initialValue,
        this.targetValue,
        this.easing(t)
      );

      this.scene.setProperty(
        this.readInput('jsonPath'),
        this.valueTypeName,
        easedValue
      );

      if (this.elapsedDuration >= this.duration) {
        this.dispose();
        engine.commitToNewFiber(this, 'flow');
        finished();
      }
    };

    this.onTick = updateOnTick;
    this.lifecycleEventEmitter.tickEvent.addListener(this.onTick);
  }

  dispose() {
    this.elapsedDuration = this.duration = 0;
    if (this.onTick !== undefined) {
      this.lifecycleEventEmitter.tickEvent.removeListener(this.onTick);
      this.onTick = undefined;
    }
  }
}
