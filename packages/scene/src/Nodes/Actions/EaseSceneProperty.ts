import {
  AsyncNode,
  Easing,
  EasingFunctions,
  EasingModes,
  Engine,
  IGraphApi,
  ILifecycleEventEmitter,
  lifecycleEventEmitterDependencyKey,
  NodeDescription,
  Socket,
  toCamelCase
} from '@oveddan-behave-graph/core';

import { getSceneDependencey } from '../../dependencies';

export class EaseSceneProperty extends AsyncNode {
  public static GetDescriptions(valueTypeNames: string[]) {
    return valueTypeNames.map(
      (valueTypeName) =>
        new NodeDescription(
          `scene/ease/${valueTypeName}`,
          'Action',
          `Ease Scene ${toCamelCase(valueTypeName)}`,
          (description, graph) =>
            new EaseSceneProperty(description, graph, valueTypeName)
        )
    );
  }

  constructor(
    description: NodeDescription,
    graph: IGraphApi,
    public readonly valueTypeName: string
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

    this.initialValue = this.scene?.getProperty(
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
      const valueType = this.graph.values[this.valueTypeName];
      this.elapsedDuration = (Date.now() - this.startTime) / 1000;

      const t = Math.min(this.elapsedDuration / this.duration, 1);
      const easedValue = valueType.lerp(
        this.initialValue,
        this.targetValue,
        this.easing(t)
      );

      this.scene?.setProperty(
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
    this.lifecycleEventEmitter?.tickEvent.addListener(this.onTick);
  }

  dispose() {
    this.elapsedDuration = this.duration = 0;
    if (this.onTick !== undefined) {
      this.lifecycleEventEmitter?.tickEvent.removeListener(this.onTick);
      this.onTick = undefined;
    }
  }

  get lifecycleEventEmitter() {
    return this.graph.getDependency<ILifecycleEventEmitter>(
      lifecycleEventEmitterDependencyKey
    );
  }

  get scene() {
    return getSceneDependencey(this.graph.getDependency);
  }
}
