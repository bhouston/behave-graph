import 'reactflow/dist/style.css';
import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import MyFlow from './components/MyFlow.js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MyFlow />
  </React.StrictMode>
);
