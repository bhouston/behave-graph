import { Link } from '../Nodes/Link.js';

export class Socket {
  public readonly links: Link[] = [];

  constructor(
    public readonly valueTypeName: string,
    public readonly name: string,
    public value: any | undefined = undefined,
    public readonly label: string | undefined = undefined
  ) {}
}
