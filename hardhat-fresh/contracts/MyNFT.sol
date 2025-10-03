// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
 import "@openzeppelin/contracts/access/Ownable.sol";

 contract MyNFT is ERC721URIStorage, Ownable {
   
    uint256 private _nextTokenId;
    uint256 public _tokenId;
    uint256 public mintFee;
    
    
    mapping(address => uint256) public balances;

    event NFTMinted (
        uint256 indexed tokenId,
        address indexed sender,
        string tokenURI,
        address nftAddress
    );
    event DepositReceived(
      address indexed sender,
      uint256 amount);

      event MintFeeUpdated(
         uint256 newFee);

      event FundWithdrawn(
         address indexed sender,
         uint256 amount);
   
    constructor(uint256 _mintFee, address admin) ERC721('MyNFT', 'MNFT') Ownable() {
       mintFee = _mintFee;
       transferOwnership(admin);
       _nextTokenId = 1;
    }

     function setMintFee(uint256 _newFee) external onlyOwner {
        mintFee = _newFee;
        emit MintFeeUpdated(_newFee);
     }
      function getMintFee() public view returns (uint256) {
         return mintFee;
      }

    function mintNFT(string memory tokenURI) external payable returns (uint256) {
        require(msg.value >= mintFee, 'Insufficient mint fee');
         
        uint256 newId = _nextTokenId;
        _safeMint(msg.sender, newId);
        _setTokenURI(newId, tokenURI);

        emit NFTMinted(newId, msg.sender, tokenURI, address(this));

       if (msg.value > mintFee) {
         uint excessAmount = msg.value - mintFee;
          balances[msg.sender] += excessAmount;
       }

            _nextTokenId++;
            return _nextTokenId;
    }
        function ownerMint(address to, string memory tokenURI) external onlyOwner returns (uint256) {
         uint256 newId = _nextTokenId;
          _safeMint(to, newId);
          _setTokenURI(newId, tokenURI);
          emit NFTMinted(newId, to, tokenURI, address(this));
              _nextTokenId++;
              return _nextTokenId;
        }
        function withdraw() external onlyOwner {
            uint256 balance = address(this).balance;
            require(balance > 0, "No fees to withdraw");
            (bool success, ) = payable(owner()).call{value: balance}("");
            require(success, "Failed Withdrawal");
            emit FundWithdrawn(owner(), balance);  
        }

        function withdrawUserBalance() external {
         uint256 userBalance = balances[msg.sender];
         require(userBalance > 0, 'No balance to withdraw');
         balances[msg.sender] = 0;

         (bool success, ) = payable(msg.sender).call{value: userBalance}("");
         require(success, "Transfer failed");
         emit FundWithdrawn(msg.sender, userBalance);
        }

         function getContractBalance() external view returns (uint256) {
            return address(this).balance;
         }
         

         receive() external payable {
            balances[msg.sender] += msg.value;
            emit DepositReceived(msg.sender, msg.value);
         }
    }
  