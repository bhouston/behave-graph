import { GraphJSON } from '@behave-graph/core';
import { FC, useState, useEffect, useCallback, useMemo, CSSProperties } from 'react';
import { useReactFlow } from 'reactflow';
import { Modal } from './Modal';
import { useDropzone } from 'react-dropzone';

import { fetchModelFile } from '../hooks/useSaveAndLoad';
import ModelPreview from '../scene/ModelPreview';
import { exampleBehaveGraphFileUrl, fetchBehaviorGraphJson } from '../hooks/useSaveAndLoad';
import { exampleModelFileUrl } from '../hooks/useSetAndLoadModelFile';

const modelFiles = {
  pressButtonToStartElevator: 'PressButtonToStartElevator.gltf',
  suzanne: 'SpinningSuzanne.gltf',
};

const graphFiles = {
  clickButtonToAnimate: 'ClickButtonToAnimate.json',
  spinningSuzanne: 'SpinningSuzanne.json',
};

export const examplePairs: [string, string][] = [
  [modelFiles.pressButtonToStartElevator, graphFiles.clickButtonToAnimate],
  [modelFiles.suzanne, graphFiles.spinningSuzanne],
];

const defaultSelectedIndex = '0';

const buildExampleOptions = () =>
  examplePairs.map((pair, i) => {
    if (pair.length === 2) {
      const [modelFile, behaviorFile] = pair;
      return {
        index: i,
        text: `Model: ${modelFile} / Behavior: ${behaviorFile}`,
        modelFile,
        behaviorFile,
      };
    } else {
      const [behaviorFile] = pair;
      return {
        index: i,
        text: `Behavior: ${behaviorFile}`,
        behaviorFile,
        modelFile: undefined,
      };
    }
  });

export type LoadModalProps = {
  open?: boolean;
  onClose: () => void;
  setBehaviorGraph: (value: GraphJSON) => void;
  setModelFile: (file: File) => void;
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const useDropZoneStyle = ({
  isFocused,
  isDragAccept,
  isDragReject,
}: {
  isFocused: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
}) => {
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  ) as CSSProperties;

  return style;
};

export const fetchExample = async (exampleIndex: number) => {
  const { modelFile, behaviorFile } = buildExampleOptions()[exampleIndex];

  const jsonFileUrl = exampleBehaveGraphFileUrl(behaviorFile);
  const fetched = await fetchBehaviorGraphJson(jsonFileUrl);

  let downloadedModelFile: File | undefined;
  if (modelFile) {
    const modelFileUrl = exampleModelFileUrl(modelFile);
    downloadedModelFile = await fetchModelFile(modelFileUrl, modelFile);
  } else {
    downloadedModelFile = undefined;
  }

  return {
    behaviorGraph: fetched,
    modelFile: downloadedModelFile,
  };
};

const emptyGraphJson = (): GraphJSON => ({});

export const LoadModal: FC<LoadModalProps> = ({ open = false, onClose, setBehaviorGraph, setModelFile }) => {
  const [behaviorGraphString, setBehaviorGraphString] = useState<string>();

  const [uploadedModelFile, setUploadedModelFile] = useState<File>();

  const instance = useReactFlow();

  useEffect(() => {
    // if reopening - clear the state
    if (open) {
      setUploadedModelFile(undefined);
      setBehaviorGraphString(undefined);
    }
  }, [open]);

  const handleLoad = useCallback(() => {
    const graph = behaviorGraphString ? (JSON.parse(behaviorGraphString) as GraphJSON) : emptyGraphJson();

    setBehaviorGraph(graph);

    if (uploadedModelFile) setModelFile(uploadedModelFile);

    // TODO better way to call fit vew after edges render
    setTimeout(() => {
      instance.fitView();
    }, 100);

    handleClose();
  }, [setModelFile, setBehaviorGraph, behaviorGraphString, uploadedModelFile, instance]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setUploadedModelFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'model/glb': ['.glb', '.gltf'],
    },
  });

  const style = useDropZoneStyle({
    isDragAccept,
    isDragReject,
    isFocused,
  });

  const handleClose = useCallback(() => {
    setBehaviorGraphString(undefined);
    setSelectedExample('');
    onClose();
  }, []);

  const exampleFileOptions = useMemo(buildExampleOptions, []);

  const [selectedExample, setSelectedExample] = useState(defaultSelectedIndex);

  useEffect(() => {
    if (selectedExample !== '') {
      (async () => {
        const { behaviorGraph, modelFile } = await fetchExample(+selectedExample);

        setBehaviorGraphString(JSON.stringify(behaviorGraph, null, 2));

        setUploadedModelFile(modelFile);
      })();
    }
  }, [selectedExample]);

  useEffect(() => {
    // by default, select first example and apply it
    (async () => {
      const { behaviorGraph } = await fetchExample(0);

      setBehaviorGraph(behaviorGraph);
    })();
  }, []);

  return (
    <Modal
      title="Load Behave Graph and Optionally Model"
      actions={[
        { label: 'Cancel', onClick: handleClose },
        { label: 'Load', onClick: handleLoad, disabled: !uploadedModelFile && !behaviorGraphString },
      ]}
      open={open}
      onClose={onClose}
    >
      <div className="grid grid-rows-2 w-full gap-2">
        <div>
          <label htmlFor="behavee-graph" className="block text-sm font-medium text-gray-700">
            behave graph json
          </label>
          <div className="mt-1">
            <textarea
              id="behave-graph"
              name="behave-graph"
              rows={5}
              className="block w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={behaviorGraphString}
              onChange={(e) => setBehaviorGraphString(e.currentTarget.value)}
            />
          </div>
          {/* <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p> */}
        </div>
        {!uploadedModelFile && (
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {<p>Drag 'n' drop a gltf or glb model file here, or click to select a file</p>}
          </div>
        )}
        {uploadedModelFile && (
          <div>
            <ModelPreview file={uploadedModelFile} />
          </div>
        )}
      </div>
      <div className="p-4 text-center text-gray-800">or</div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-3"
        onChange={(e) => setSelectedExample(e.target.value)}
        value={selectedExample}
      >
        <option disabled value="">
          Select an example
        </option>
        {exampleFileOptions.map(({ index, text }) => (
          <option key={index} value={index}>
            {text}
          </option>
        ))}
      </select>
    </Modal>
  );
};
