import { useEffect, useState } from 'react';
import { FileLocationKindLocal, FileLocationLocal, SceneFilesLocal, FileReference, Optional } from './types';

function convertURIToHTTPSInner({ url, ipfsHost = 'https://ipfs.io' }: { url: string | undefined; ipfsHost?: string }) {
  if (!url) return undefined;
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', `${ipfsHost}/ipfs/`);
  }
  return url;
}

export function convertURIToHTTPS(url: string | undefined) {
  const result = convertURIToHTTPSInner({ url });

  if (!result) throw new Error(`missing result, inputs were, ${JSON.stringify(args)}`);

  return result;
}

export const useHttpsUriForIpfs = (ipfsUrl?: Optional<string>) => {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (!ipfsUrl) {
      setResult(null);
      return;
    }

    setResult(convertURIToHTTPS({ url: ipfsUrl }));
  }, [ipfsUrl]);

  return result;
};

export function ipfsUrlToCid(url: string) {
  const lastSlash = url.lastIndexOf('/');

  return url.substring(lastSlash, url.length);
}
