import { EventEmitter } from '../../../../Events/EventEmitter.js';
import { ValueTypeRegistry } from '../../../../Values/ValueTypeRegistry.js';
import { BooleanValue } from '../../../Core/Values/BooleanValue.js';
import { FloatValue } from '../../../Core/Values/FloatValue.js';
import { IntegerValue } from '../../../Core/Values/IntegerValue.js';
import { StringValue } from '../../../Core/Values/StringValue.js';
import { ColorValue } from '../../Values/ColorValue.js';
import { EulerValue } from '../../Values/EulerValue.js';
import { QuatValue } from '../../Values/QuatValue.js';
import { Vec2Value } from '../../Values/Vec2Value.js';
import { Vec3Value } from '../../Values/Vec3Value.js';
import { Vec4Value } from '../../Values/Vec4Value.js';
import { IScene } from '../IScene.js';

export class DummyScene implements IScene {
  public onSceneChanged = new EventEmitter<void>();
  private valueRegistry = new ValueTypeRegistry();

  constructor() {
    const values = this.valueRegistry;
    // pull in value type nodes
    values.register(BooleanValue);
    values.register(StringValue);
    values.register(IntegerValue);
    values.register(FloatValue);
    values.register(Vec2Value);
    values.register(Vec3Value);
    values.register(Vec4Value);
    values.register(ColorValue);
    values.register(EulerValue);
    values.register(QuatValue);
  }

  getProperty(jsonPath: string, valueTypeName: string): any {
    return this.valueRegistry.get(valueTypeName).creator();
  }
  setProperty(): void {
    this.onSceneChanged.emit();
  }
  addOnClickedListener(
    jsonPath: string,
    callback: (jsonPath: string) => void
  ): void {
    console.log('added on clicked listener');
  }
  removeOnClickedListener(
    jsonPath: string,
    callback: (jsonPath: string) => void
  ): void {
    console.log('removed on clicked listener');
  }
}
