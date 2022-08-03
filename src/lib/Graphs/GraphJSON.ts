export type LinkJSON = { node: number; socket: string };

export type InputJSON = {
  value?: string | number | boolean;
  links?: LinkJSON[];
}

export type NodeJSON = {
  type: string;
  inputs?: {
    [key: string]: InputJSON;
  };
};

export type GraphJSON = NodeJSON[];
