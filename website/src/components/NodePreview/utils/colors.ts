import { NodeSpecJSON } from 'packages/core/src/Graphs/IO/NodeSpecJSON';

export const colors: Record<string, [string, string, string]> = {
  red: ['#f56565', '#ed64a6', '#ffffff'],
  green: ['#48bb78', '#38a169', '#ffffff'],
  lime: ['#68d391', '#4fd1c5', '#ffffff'],
  purple: ['#805ad5', '#667eea', '#ffffff'],
  blue: ['#4299e1', '#63b3ed', '#ffffff'],
  gray: ['#718096', '#a0aec0', '#ffffff'],
  white: ['#ffffff', '#ffffff', '#2d3748']
};

export const valueTypeColorMap: Record<string, string> = {
  flow: 'white',
  number: 'green',
  float: 'green',
  integer: 'lime',
  boolean: 'red',
  string: 'purple'
};

export const categoryColorMap: Record<NodeSpecJSON['category'], string> = {
  Event: 'red',
  Logic: 'green',
  Variable: 'purple',
  Query: 'purple',
  Action: 'blue',
  Flow: 'gray',
  Time: 'gray',
  None: 'gray'
};
