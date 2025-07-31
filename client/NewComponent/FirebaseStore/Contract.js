 // SPDX-Licence-Identifier: MIT
 //pragma solidity ^0.8.19;
 import "!@openzeppelin/contracts/token/ERC721/IERC721.sol";
 import "!@openzeppelin/contracts/access/Ownable.sol";

    // buy contract
    // contract NFTMarketplace is ownable {
    //     struct Sale {
    //      address buyer;
    //      address seller;
    //      unit256 tokenId;
    //      unit256 amount;
    //      unit256 commision;
    //     }
    //     unit256 public commission Perecnt = 5;
    //     address public treasury;
    //     event NFTPurchased(address indexed buyer, address indexed seller,
    //         unit256 amount, unit256 commission
    //     );
    //     constructor(address _treasury) {
    //         treasury = _treasury;
    //     };
       
    //     function buyNFT(address nftAddress, unit256 tokenId, address seller)
    //     external payable {
    //         IERC721 nft = IERC721(nftAddress);

    //         require(msg.value > 0, 'Payment required');
    //         require(nft.ownerOf(tokenId) === seller, 'Seller not owner');

    //         unit156 commission = (msg.value * commision) / 100;
    //         unit256 seelerAmount = msg.value - commission;

    //         // transfer ETH
    //         payable(seller).transfer(seelerAmount);
    //         payable(treasury).transfer(commission);

    //         //Transfer NFT
    //         nft.safeTransferFrom(seller, msg.sender, tokenId);
            
    //         emit NFTPurchased(msg.sender, seller, tokenId, msg.value, commission);

    //         function setCommission(unit256 _percent) external onlyOnwer {
    //             commissionPercent = _percent;
    //         }
    //     }
    // }  
