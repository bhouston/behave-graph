import { Link } from '../Nodes/Link';

export class Socket {
  public readonly links: Link[] = [];

  constructor(
    public readonly valueTypeName: string,
    public readonly name: string,
    public value: any | undefined = undefined,
    public readonly label: string | undefined = undefined,
    public readonly valueChoices: any[] = []
  ) {}
}
