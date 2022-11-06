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
    string id;
    NodeType nodeType;
    TokenGateRule tokenGateRule;
}

contract BehaviorGraph is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    mapping(uint256 => mapping(string => Node)) private _tokenNodes;
    mapping(uint256 => mapping(string => uint256)) private _tokenNodeEmitCount;

    Counters.Counter private _nodeCounter;

    Counters.Counter private _tokenIdCounter;

    event SafeMint(uint256 tokenId, address to, string uri, Node[] nodes);

    error InvalidActionId(string nodeId);
    error MissingTokens(string nodeId, address tokenAddress);

    event ActionExecuted(address executor, uint256 tokenId, string actionId, uint256 count);

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
        emit SafeMint(tokenId, to, sceneUri, _nodes);
    
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
          Node calldata node = _nodes[i];
          _tokenNodes[tokenId][node.id] = node;
        }
    }

    function getNode(uint256 tokenId, string memory _nodeId) public view returns(Node memory) {
        return _tokenNodes[tokenId][_nodeId];
    }

    function executeAction(uint256 tokenId, string calldata _nodeId) public {
       Node memory node = getNode(tokenId, _nodeId);

       _assertCanExecuteAction(node);
    
        uint256 actionCount = ++_tokenNodeEmitCount[tokenId][_nodeId];
    
        emit ActionExecuted(msg.sender, tokenId, _nodeId, actionCount);
    }

    function getActionCounts(uint256 tokenId, string[] calldata _nodeIds) public view returns(uint256[] memory) {
        // uint256 numberElems = _nodeIds.length;
        uint256[] memory result = new uint256[](_nodeIds.length);
        
        for(uint256 i = 0; i < _nodeIds.length; i++) {
            string memory _nodeId = _nodeIds[i];
            uint256 count = _tokenNodeEmitCount[tokenId][_nodeId];
            result[i] = count;
        }
        return result;
    }

    function _assertCanExecuteAction(Node memory node) private view {
        if (!node.tokenGateRule.active) {
            return;
        }

        ERC721 erc721Contract = ERC721(node.tokenGateRule.tokenContract);

        uint256 balance = erc721Contract.balanceOf(msg.sender);

        if (balance <= 0) {
            revert MissingTokens(node.id, msg.sender);
        }
    }
}
