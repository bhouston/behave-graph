import 'reactflow/dist/style.css';
import './index.css';

import { GraphJSON, Logger } from '@behave-graph/core';
//import { Flow } from '@behave-graph/flow';
import React from 'react';
import ReactDOM from 'react-dom/client';

import rawGraph from './graph.json';

const graph = rawGraph as unknown as GraphJSON;

Logger.error( "Hello World!" );
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
   
  </React.StrictMode>
);
