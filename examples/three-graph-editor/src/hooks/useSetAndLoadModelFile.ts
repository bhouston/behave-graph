import { GraphJSON } from '@behave-graph/core';
import { useLoader } from '@react-three/fiber';
import { useCallback, useState } from 'react';
import { suspend } from 'suspend-react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function readFileContents(file: File) {
  // eslint-disable-next-line promise/avoid-new
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

type ModelFile = {
  file: File;
  dataUri: string;
};

export const fetchModelFile = async (url: string, fileName: string) => {
  // eslint-disable-next-line unicorn/no-await-expression-member
  const blob = await (await fetch(url)).blob();

  const file = new File([blob], fileName);

  return file;
};

export const exampleModelFileUrl = (fileName: string) =>
  publicUrl(`/examples/models/${fileName}`);

const useSetAndLoadModelFile = ({
  initialFileUrl
}: {
  initialFileUrl: string;
}) => {
  const initialModelFile = suspend(async () => {
    const modelFile = await fetchModelFile(initialFileUrl, initialFileUrl);

    const modelFileDataUrl = (await dataUrlFromFile(modelFile)) as string;

    const result: ModelFile = {
      file: modelFile,
      dataUri: modelFileDataUrl
    };

    return result;
  }, [initialFileUrl]);

  const [modelFile, setModelFileAndDataUri] = useState<{
    file: File;
    dataUri: string;
  }>(initialModelFile);

  const gltf = useLoader(GLTFLoader, modelFile.dataUri);

  const setModelFile = useCallback(async (modelFile: File) => {
    const modelFileDataUrl = (await dataUrlFromFile(modelFile)) as string;
    setModelFileAndDataUri({ file: modelFile, dataUri: modelFileDataUrl });
  }, []);

  return {
    setModelFile,
    modelFile,
    gltf
  };
};

export default useSetAndLoadModelFile;
