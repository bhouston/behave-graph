import { GraphJSON } from '@behavior-graph/framework';
import { ClampToEdgeWrapping } from 'three';
import useInteractiveWorldMinter, { useSaveSceneToIpfs } from '../hooks/useInteractiveWorldMinter';
import clsx from 'clsx';
import { abi } from '../contracts/abi';
import { useContractEvent } from 'wagmi';
import { useState } from 'react';
import { convertURIToHTTPS } from '../hooks/ipfs/ipfsUrlUtils';
import { Link } from 'react-router-dom';

const MintToChainButton = ({
  cid,
  behaviorGraph,
  contractAddress,
}: {
  cid: string;
  behaviorGraph: GraphJSON;
  contractAddress: string;
}) => {
  const { isSuccess, isLoading, isError, error, write } = useInteractiveWorldMinter({
    behaviorGraph,
    contractAddress,
    worldCid: cid,
  });

  const [mintedTokenId, setMintedTokenId] = useState<number | null>(null);

  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: 'SafeMint',
    listener(tokenId, to, uri, nodes) {
      // hack - if this was minted with the proper cid, we can assume this was the token.
      if (uri === cid) {
        console.log('minted token id', tokenId);

        setMintedTokenId(tokenId.toNumber());
      }
    },
  });

  const disabled = isSuccess || isLoading;

  return (
    <>
      <button
        type="submit"
        className={clsx(
          'text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
          { 'bg-blue-700 hover:bg-blue-800': !disabled }
        )}
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          if (write) write();
        }}
      >
        Mint
      </button>
      {isSuccess && <div>Succeeded</div>}
      {mintedTokenId && (
        <div>
          <Link to={`/worlds/${mintedTokenId}`}>{`token: (${mintedTokenId})`} </Link>
        </div>
      )}
    </>
  );
};

const MintButton = ({
  contractAddress,
  behaviorGraph,
  modelUrl,
}: {
  contractAddress: string;
  behaviorGraph: GraphJSON;
  modelUrl: string;
}) => {
  const { cid, saveSceneToIpfs } = useSaveSceneToIpfs({
    modelUrl,
    behaviorGraph,
  });

  const disabled = !!cid;

  const text = !!cid ? (
    <>
      {'Saved to IPFS:'}
      {`ipfs://${cid}`}
    </>
  ) : (
    'Save to Ipfs'
  );

  return (
    <>
      <button
        type="submit"
        className={clsx(
          'text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ',
          {
            'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800': !disabled,
            'bg-gray-500': disabled,
          }
        )}
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          saveSceneToIpfs();
        }}
      >
        {text}
      </button>
      {cid && <MintToChainButton cid={cid} behaviorGraph={behaviorGraph} contractAddress={contractAddress} />}
      {cid && (
        <>
          <a href={convertURIToHTTPS(`ipfs://${cid}`)}>{`ipfs://${cid}`} </a>
        </>
      )}
    </>
  );
};

export default MintButton;
