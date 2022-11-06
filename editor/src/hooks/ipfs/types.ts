export type Optional<T> = T | null;

export enum FileLocationKindStored {
  ipfs = 'ipfs',
  local = 'local',
  https = 'https',
}
export type FileReference = {
  fileId: string;
};

export type FileLocationStored =
  | {
      url: string;
      kind: FileLocationKindStored.https;
    }
  | {
      kind: FileLocationKindStored.local;
      path: string;
    }
  | {
      kind: FileLocationKindStored.ipfs;
      cid: string;
      url: string;
    };

export type SceneFilesStored = {
  [path: string]: FileLocationStored;
};

export enum FileLocationKindLocal {
  ipfs = 'ipfs',
  uploaded = 'uploaded',
  https = 'https',
}

export type FileLocationLocal =
  | {
      url: string;
      kind: FileLocationKindLocal.https;
    }
  | {
      kind: FileLocationKindLocal.uploaded;
      file: File;
    }
  | {
      kind: FileLocationKindLocal.ipfs;
      file: File;
      cid: string;
      url: string;
    };

export type SceneFilesLocal = {
  [path: string]: FileLocationLocal;
};
