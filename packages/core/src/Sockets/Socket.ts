import { Link } from '../Nodes/Link.js';

export type Choices = string[] | { text: string; value: any }[];

export class Socket {
  public readonly links: Link[] = [];

  constructor(
    public readonly valueTypeName: string,
    public readonly name: string,
    public value: any | undefined = undefined,
    public readonly label: string | undefined = undefined,
    public readonly valueChoices?: Choices // if not empty, value must be one of these.
  ) {}
}
