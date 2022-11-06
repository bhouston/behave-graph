import { Suspense } from 'react';
import { client, chains } from './web3/client';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import EditorAndScene from './EditorAndScene';
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import OnChainWorldWrapper from './onChainWorld/OnChainWorld';

const router = createBrowserRouter([
  {
    path: '/',
    element: <EditorAndScene />,
  },
  {
    path: 'worlds/:tokenId',
    element: <OnChainWorldWrapper />,
  },
]);

function App() {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
