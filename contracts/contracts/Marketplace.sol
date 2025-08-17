
pragma ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface INFT {
    function safeTransferFrom(address from, address to, uint tokenId) external;
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract NFTMarketplace {
    address public nftAddress;
    uint256 public commissionPercent = 5;

    struct Listing {
        uint tokenId;
        nftAddress;
        listingId;
        address seller;
        unit price;
        bool active;
        uint256 commission;
    }
    mapping(unit => Listing) public listings;
    
    unit256 public listingIdCounter;
    
    event NFTListed(
         uint256 indexed listingId,
         address indexed nftAddress        
         address indexed seller,
         uint256 tokenId,
          uint256 price, 
          uint256 commission,
          

          );
    event NFTSold(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 price,
        uint256 commission
        );

    constructor() {
        owner = msg.sender;
    }

    function listNFT( address nftAddress, uint256 tokenId, uint256 price) external{
        require(IERC721(nftAddress).ownerOf(tokenId) == msg.sender, 'Not token owner');
        require(IERC721(nftAddress).getApproved(tokenId) == address(this) ||
        IERC721(nftAddress).isApprovedForAll(msg.sender, address(this)),
        'Marketplace not approved');
        
        uint256 commission = (price * commissionPercent)/100;
        listings[listingIdCounter] = Listing({
            nftAddress,
            tokenId, 
            seller : msg.sender, 
            price,
            commission,
            active: true
    });
    emit NFTListed(listingId, nftAddress,tokenId, msg.sender, price, commission);
    }

    function buyNFT(uint256 listingId) external payable {
        Listing storage listing = listings[listingId];
        require(listing.active, 'Not listed');
        require(msg.value == listing.price, 'incorrect price');

        listing.active = false;

        uint256 commission = listing.commission;
        uint256 sellerAmount = listing.price - commission;

         (bool successPayment, ) = payable(listing.seller).call{value: sellerAmount}("");
        require(successFee, 'Payment failed')

         (bool successTransfer, ) = payable(owner()).call{value: commission}("");
            require(successRefund, ' Failed commission payment');
        
    
        IERC721(listing.nftAddress).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        emit NFTSold(listing, msg.sender, msg.value);
    
    }
}