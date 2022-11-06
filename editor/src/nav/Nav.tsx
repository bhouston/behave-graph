import { GraphJSON } from '@behavior-graph/framework';
import SaveToIpfsAndMintButton from './SaveToIpfsAndMintButton';
import Web3Login from './Web3Login';

const Nav = ({
  graphJson,
  modelUrl,
  contractAddress,
}: {
  graphJson: GraphJSON | undefined;
  modelUrl: string;
  contractAddress: string | null;
}) => {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        {graphJson && contractAddress && (
          <SaveToIpfsAndMintButton behaviorGraph={graphJson} contractAddress={contractAddress} modelUrl={modelUrl} />
        )}
      </div>
      <div className="col-span-1">
        <Web3Login />
      </div>
    </div>
  );
};

export default Nav;
