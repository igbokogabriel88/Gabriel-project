// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is Ownable {
    uint256 public listingIdCounter;
    address currentOwner = owner();
    address public nftAddress;
    uint256 public commissionPercent = 5;

    struct Listing {
        uint256 tokenId;
        address nftAddress;
        uint256 listingId;
        address seller;
        uint256 price;
        bool active;
        uint256 commission;
    }
    mapping(uint => Listing) public listings;
    
    event NFTListed(
         uint256 indexed listingId,
         address indexed nftAddress,       
         address seller,
         uint256 tokenId,
          uint256 price, 
          bool active,
          uint256 commission
          );

    event NFTSold(
        uint256 indexed listingId,
        address indexed buyer,
        address nftAddress,
        uint256 price,
        uint256 commission
        );
        event Cancelled(uint256 listingId);

    constructor() {}

    function listNFT( address nftAddress, uint256 tokenId, uint256 price) external{
      require(price > 0, "Price must be greater than 0");
      IERC721 nft = IERC721(nftAddress);
        require(nft.ownerOf(tokenId) == msg.sender, 'Not token owner');
        require(nft.getApproved(tokenId) == address(this) ||
        nft.isApprovedForAll(msg.sender, address(this)),
        'Marketplace not approved');
        
        uint256 commission = (price * commissionPercent)/100;
        listingIdCounter++;
        uint listingCounter = listingIdCounter;
        listings[listingCounter] = Listing({
            listingId: listingCounter,
            nftAddress: nftAddress,
            seller : msg.sender, 
            tokenId: tokenId,
            price: price,
            active: true,
            commission: commission
    });
    emit NFTListed(listingCounter, nftAddress, msg.sender, tokenId, price, true, commission);
    }

    function buyNFT(uint256 listingId) external payable {
        Listing storage listing = listings[listingId];
        require(listing.active, 'Not listed');
        require(msg.value >= listing.price, 'incorrect price');

        listing.active = false;

        uint256 commission = listing.commission;
        uint256 sellerAmount = listing.price - commission;

         (bool successPayment, ) = payable(listing.seller).call{value: sellerAmount}("");
        require(successPayment, 'Payment failed');

         (bool successTransfer, ) = payable(owner()).call{value: commission}("");
            require(successTransfer, ' Failed commission payment');
        
    
        IERC721(listing.nftAddress).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        emit NFTSold(listing.listingId, msg.sender, listing.nftAddress, msg.value, commission);
    
    }
     function cancelListing(uint256 _listingId) external {
      Listing storage listing = listings[_listingId];
      require(listing.seller == msg.sender, "Not seller");
      require(listing.active, "Listing on active");

      listing.active = false;
      emit Cancelled(_listingId);
     }
}