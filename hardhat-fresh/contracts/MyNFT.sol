// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
 import "@openzeppelin/contracts/access/Ownable.sol";

 contract MyNFT is ERC721URIStorage, Ownable {
    uint256 public _tokenId;
    uint256 public mintFee;

    event NFTMinted (
        uint256 indexed tokenId,
        address indexed owner,
        string tokenURI
    );

    constructor(uint256 _mintFee, address admin) ERC721('MyNFT', 'MNFT') Ownable() {
       mintFee = _mintFee;
       transferOwnership(admin);
    }
     function setMintFee(uint256 _newFee) external onlyOwner {
        mintFee = _newFee;
     }

    function mintNFT(string memory tokenURI) external payable {
        require(msg.value >= mintFee, 'Insufficient mint fee');
    
        uint256 newId = _tokenId;
        _safeMint(msg.sender, newId);
        _setTokenURI(newId, tokenURI);

        emit NFTMinted(newId, msg.sender, tokenURI);

       if (msg.value > mintFee) {
        (bool success, ) = payable(msg.sender).call{value: msg.value - mintFee}("");
        require(success, "Refund failed");
       }

       _tokenId++;
    }
        
        function withdraw() external onlyOwner {
            (bool success, ) = payable(owner()).call{value: address(this).balance}("");
            require(success, "Failed Withdrawal");
        }
    }
  