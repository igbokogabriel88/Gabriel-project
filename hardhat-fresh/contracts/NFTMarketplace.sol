// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MyExhibition.sol";

contract NFTMarketplace is Ownable {
    
ExhibitionManager public exhibitionManager;

    uint256 public listingIdCounter;
    address currentOwner = owner();
    address public nftAddress; 
    uint256 public commissionPercent = 5;
    address public profitWallet;

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
        bool active,
        uint256 tokenId
        );
        event Cancelled(uint256 listingId);

    constructor(address _exhibitionManager, address _treasury) Ownable() {
        exhibitionManager = ExhibitionManager(_exhibitionManager);
        profitWallet = _treasury;
        listingIdCounter = 0;
    }

    function listNFT( address _nftAddress, uint256 _tokenId, uint256 _price) external returns (uint256) {
      require(_price > 0, "Price must be greater than 0");
      IERC721 nft = IERC721(_nftAddress);
        require(nft.ownerOf(_tokenId) == msg.sender, 'Not token owner');
        require(nft.getApproved(_tokenId) == address(this) ||
        nft.isApprovedForAll(msg.sender, address(this)),
        'Marketplace not approved');
        
        uint256 commission = (_price * commissionPercent)/100;
        bool isListed = true;
        listingIdCounter++;
        uint newListingId = listingIdCounter;
        listings[newListingId] = Listing({
            listingId: newListingId,
            nftAddress: _nftAddress,
            seller : msg.sender, 
            tokenId: _tokenId,
            price: _price,
            active: isListed,
            commission: commission
    });
    emit NFTListed(newListingId, _nftAddress, msg.sender, _tokenId, _price, isListed, commission);
       return newListingId;
    }

    function buyNFT(uint256 _listingId, uint256 _tokenId, uint256 _exhibitionId) external payable {
        Listing storage listing = listings[_listingId];
        require(listing.active, 'Not listed');
        require(msg.value >= listing.price, 'incorrect price');

        listing.active = false;

        uint256 saleBonusBps = 0;
        address curator = address(0);
        uint256 exhibitionBonus = 0;

        if (_exhibitionId > 0) {
            ( , , , , , , bool isActive, , , ) = exhibitionManager.getExhibition(_exhibitionId);
            require(isActive, "Exhibition not active");
            require(exhibitionManager.canAccessExhibition(_exhibitionId, msg.sender), "Pay join fee first");

            ( saleBonusBps, curator) = exhibitionManager.getExhibitionInfo(_exhibitionId);
             exhibitionBonus = (listing.price * saleBonusBps)/10000;

            if (exhibitionBonus > 0) {
                (bool success1, ) = payable(curator).call{value: exhibitionBonus}("");
                require(success1, 'Failed to send ETH to curator');
            }
        }

            uint256 commission = listing.commission;
            uint256 sellerAmount = listing.price - commission - exhibitionBonus;

         (bool success2, ) = payable(listing.seller).call{value: sellerAmount}("");
         require(success2, ' Failed to send ETH to seller');
        
         (bool success3, ) = payable(profitWallet).call{value: commission}("");
            require(success3, ' Failed to send ETH to contract owner');
        
    
        IERC721(listing.nftAddress).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        emit NFTSold(listing.listingId, msg.sender, listing.nftAddress, msg.value, listing.active, _tokenId);
    
    }

     function cancelListing(uint256 _listingId) external {
      Listing storage listing = listings[_listingId];
      require(listing.seller == msg.sender, "Not seller");
      require(listing.active, "Listing on active");

      listing.active = false;
      emit Cancelled(_listingId);
     }
     function setProfitAddress(address _newProfitAddress) external onlyOwner {
        profitWallet = _newProfitAddress;
     }
}

