import {
  BooleanValue,
  EventEmitter,
  FloatValue,
  IntegerValue,
  StringValue,
  ValueType
} from '@behave-graph/core';

import { ColorValue } from '../../Values/ColorValue.js';
import { EulerValue } from '../../Values/EulerValue.js';
import { QuatValue } from '../../Values/QuatValue.js';
import { Vec2Value } from '../../Values/Vec2Value.js';
import { Vec3Value } from '../../Values/Vec3Value.js';
import { Vec4Value } from '../../Values/Vec4Value.js';
import { IScene } from '../IScene.js';

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

  getProperty(_jsonPath: string, valueTypeName: string): any {
    return this.valueRegistry[valueTypeName]?.creator();
  }
  setProperty(): void {
    this.onSceneChanged.emit();
  }
  addOnClickedListener(
    _jsonPath: string,
    _callback: (jsonPath: string) => void
  ): void {
    console.log('added on clicked listener');
  }
  removeOnClickedListener(
    _jsonPath: string,
    _callback: (jsonPath: string) => void
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
