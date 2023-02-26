import { GraphJSON } from '@behave-graph/core';

export const exampleBehaveGraphFileUrl = (fileName: string) =>
  publicUrl(`/examples/graphs/${fileName}`);
export const fetchBehaviorGraphJson = async (url: string) =>
  // eslint-disable-next-line unicorn/no-await-expression-member
  (await (await fetch(url)).json()) as GraphJSON;

function readFileContents(file: File) {
  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;

      if (!binaryStr) reject('no binary string');
      else resolve(binaryStr);
    };
    reader.readAsArrayBuffer(file);
  });
}

export const dataUrlFromFile = async (file: File) => {
  const fileContents = await readFileContents(file);
  if (fileContents) {
    if (typeof fileContents === 'string') {
      return fileContents;
    } else {
      const blobUrl = URL.createObjectURL(new Blob([fileContents]));

      return blobUrl;
    }
  }
};

export const publicUrl = (path: string) => new URL(path, import.meta.url).href;

export const emptyGraphJson = (): GraphJSON => ({});

export type ModelFile =
  | {
      fileUrl: string;
      fileType: 'url';
      fileContents: undefined;
    }
  | {
      fileUrl: undefined;
      fileType: 'uploaded';
      fileContents: string;
    };

export const fetchModelFile = async (url: string, fileName: string) => {
  // eslint-disable-next-line unicorn/no-await-expression-member
  const blob = await (await fetch(url)).blob();

  const file = new File([blob], fileName);

  return file;
};
