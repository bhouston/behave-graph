import { Web3Storage } from 'web3.storage';

// @ts-ignore
const web3StorageKey = import.meta.env.VITE_WEB3_STORAGE_KEY as string | undefined;

export const makeWeb3StorageClient = () => {
  if (!web3StorageKey) throw new Error('VITE_WEB3_STORAGE_KEY environment variable must be defined.');
  // @ts-ignore
  return new Web3Storage({ token: web3StorageKey });
};
