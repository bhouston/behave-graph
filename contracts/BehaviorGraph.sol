// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

enum NodeType {
    Action,
    DataSource
}

struct TokenGateRule {
    bool active;
    address tokenContract;
}


struct Node {
    NodeType nodeType;
    TokenGateRule tokenGateRule;
}

contract BehaviorGraph is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    mapping(uint256 => Node[]) private _tokenNodes;

    Counters.Counter private _nodeCounter;

    Counters.Counter private _tokenIdCounter;

    event SafeMint(uint256 tokenId, address to, string uri, Node[] nodes);

    error InvalidActionId(uint256 actionId);
    error MissingTokens(uint256 actionId, address tokenAddress);

    event ActionExecuted(address executor, uint256 tokenId, uint256 actionId);

    constructor() ERC721("MyToken", "MTK") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(string memory sceneUri, Node[] calldata _nodes) public onlyOwner returns(uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        address to = msg.sender;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, sceneUri);
        _createNodes(tokenId, _nodes);
        emit SafeMint(tokenId, to, sceneUri, _tokenNodes[tokenId]);
    
        return tokenId;
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    } 

     function _createNodes(uint256 tokenId, Node[] calldata _nodes) private onlyOwner {
        for(uint256 i = 0; i < _nodes.length; i++) {
          _tokenNodes[tokenId].push(_nodes[i]);
        }
    }

    function getNodes(uint256 tokenId) public view returns(Node[] memory) {
        return _tokenNodes[tokenId];
    }

    function getNode(uint256 tokenId, uint256 actionId) public view returns(Node memory) {
        return getNodes(tokenId)[actionId];
    }

    function executeAction(uint256 tokenId, uint256 actionId) public {
       if (actionId >= _tokenNodes[tokenId].length) {
          revert InvalidActionId(actionId);
       }

       _assertCanExecuteAction(tokenId, actionId);
    
        emit ActionExecuted(msg.sender, tokenId, actionId);
    }

    function _assertCanExecuteAction(uint256 tokenId, uint256 actionId) private view {
        Node memory node = getNode(tokenId, actionId);

        if (!node.tokenGateRule.active) {
            return;
        }

        ERC721 erc721Contract = ERC721(node.tokenGateRule.tokenContract);

        uint256 balance = erc721Contract.balanceOf(msg.sender);

        if (balance <= 0) {
            revert MissingTokens(actionId, msg.sender);
        }
    }
}
