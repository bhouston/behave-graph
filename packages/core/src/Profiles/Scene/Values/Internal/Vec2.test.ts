import {
  Vec2,
  vec2Add,
  vec2Dot,
  vec2FromArray,
  vec2Length,
  vec2MultiplyByScalar,
  vec2Negate,
  vec2Normalize,
  vec2Parse,
  vec2Subtract,
  vec2ToArray,
  vec2ToString
} from './Vec2';

describe('vec2 value type', () => {
  test('constructor', () => {
    const value = new Vec2(1, 2);
    expect(value.x).toEqual(1);
    expect(value.y).toEqual(2);
  });
  test('add', () => {
    const value = vec2Add(new Vec2(1, 2), new Vec2(3, 4));
    expect(value.x).toEqual(4);
    expect(value.y).toEqual(6);
  });
  test('subtract', () => {
    const value = vec2Subtract(new Vec2(1, 2), new Vec2(3, 8));
    expect(value.x).toEqual(-2);
    expect(value.y).toEqual(-6);
  });
  test('scale', () => {
    const value = vec2MultiplyByScalar(new Vec2(1, 2), 2);
    expect(value.x).toEqual(2);
    expect(value.y).toEqual(4);
  });
  test('negate', () => {
    const value = vec2Negate(new Vec2(1, 2));
    expect(value.x).toEqual(-1);
    expect(value.y).toEqual(-2);
  });
  test('length', () => {
    const value = vec2Length(new Vec2(1, 2));
    expect(value).toEqual(Math.sqrt(1 + 2 * 2));
  });
  test('normalize', () => {
    const value = vec2Normalize(new Vec2(0, 2));
    expect(value.x).toEqual(0);
    expect(value.y).toEqual(1);
  });
  test('dot', () => {
    const value = vec2Dot(new Vec2(0, 2), new Vec2(3, 4));
    expect(value).toEqual(8);
  });
  test('fromArray', () => {
    const value = vec2FromArray([1, 2, 3], 1);
    expect(value.x).toEqual(2);
    expect(value.y).toEqual(3);
  });
  test('fromArray', () => {
    const array = [1, 2, 3];
    vec2ToArray(new Vec2(6, 7), array, 1);
    expect(array[1]).toEqual(6);
    expect(array[2]).toEqual(7);
  });
  test('toString/parser', () => {
    const v = new Vec2(10, 5.5);
    const text = vec2ToString(v);
    const v2 = vec2Parse(text);
    expect(v.x).toEqual(v2.x);
    expect(v.y).toEqual(v2.y);
  });
});
