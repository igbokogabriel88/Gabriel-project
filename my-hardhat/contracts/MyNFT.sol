// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
 import "@openzeppelin/contracts/access/Ownable.sol";

 contract MyNFT is ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 public totalMinted = 0.02 ether;
    uint256 public mintFee;
    address payable public treasury;

   
    mapping(uint256 => string) private _tokenURIs;

    event NFTMinted(
        uint256 indexed tokenId,
        address indexed minter,
        string metadataURI );

    constructor(address payable _treasury) ERC721('MyNFT', 'MNFT') {
        require(_treasury != address(0), 'Treasury zero addr');
        treasury = _treasury;
        transferOwnership(msg.sender);
    }

    function mint(string calldata tokenURI) external payable returns (uint256) {
        require(msg.value >= mintFee, 'Insufficient mint fee');
        
        uint256 refund = msg.value - mintFee;
        if (refund > 0) {
            (bool successRefund, ) = payable(msg.sender).call{value: refund}("");
            require(successRefund, 'Refund failed');
        }
        (bool successFee, ) = payable(treasury).call{value: mintFee}("");
        require(successFee, 'Failed to send ETH to treasury');

        uint256 tokenId = totalMinted;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        totalMinted++;

        emit NFTMinted(tokenId, msg.sender, tokenURI);
    }

        function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
            super._burn(tokenId);
        }

        function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
            return super.tokenURI(tokenId);
        }
        function _beforeTokenTransfer(
            address from,
            address to,
            uint256 tokenId,
            uint256 batchSize
        ) internal virtual override(ERC721, ERC721Enumerable) {
            super._beforeTokenTransfer(from, to, tokenId, batchSize);
        }

        function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
            return super.supportsInterface(interfaceId);
        }

        function _setTokenURL(uint256 tokenId, string memory tokenURI) internal {
              _tokenURIs[tokenId] = tokenURI;
        }

        function tokenURI(uint256 tokenId) public view returns (string memory) {
            return _tokenURIs[tokenId];
        }
    }
 