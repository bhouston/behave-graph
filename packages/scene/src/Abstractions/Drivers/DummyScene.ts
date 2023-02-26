import {
  BooleanValue,
  EventEmitter,
  FloatValue,
  IntegerValue,
  StringValue,
  ValueType
} from '@behave-graph/core';

import { ColorValue } from '../../Values/ColorValue';
import { EulerValue } from '../../Values/EulerValue';
import { QuatValue } from '../../Values/QuatValue';
import { Vec2Value } from '../../Values/Vec2Value';
import { Vec3Value } from '../../Values/Vec3Value';
import { Vec4Value } from '../../Values/Vec4Value';
import { IScene } from '../IScene';

export class DummyScene implements IScene {
  public onSceneChanged = new EventEmitter<void>();

  private valueRegistry: Record<string, ValueType>;

  constructor() {
    this.valueRegistry = Object.fromEntries(
      [
        BooleanValue,
        StringValue,
        IntegerValue,
        FloatValue,
        Vec2Value,
        Vec3Value,
        Vec4Value,
        ColorValue,
        EulerValue,
        QuatValue
      ].map((valueType) => [valueType.name, valueType])
    );
    // pull in value type nodes
  }

  getProperty(jsonPath: string, valueTypeName: string): any {
    return this.valueRegistry[valueTypeName]?.creator();
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

  getQueryableProperties() {
    return [];
  }

  getRaycastableProperties() {
    return [];
  }

  getProperties() {
    return [];
  }

  addOnSceneChangedListener() {
    console.log('added on scene changed listener');
  }

  removeOnSceneChangedListener(): void {
    console.log('removed on scene changed listener');
  }
}
