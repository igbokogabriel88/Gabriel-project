pragma ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface INFT {
    function safeTransferFrom(address from, address to, uint tokenId) external;
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract NFTMarketplace is Ownable {
    address currentOwner = owner();
    address public nftAddress;
    uint256 public commissionPercent = 5;
    uint256 public listingId = 1;

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
    
    uint256 public listingIdCounter;
    
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
        uint256 price,
        uint256 commission
        );

    constructor() {}

    function listNFT( address nftAddress, uint256 tokenId, uint256 price) external{
        require(IERC721(nftAddress).ownerOf(tokenId) == msg.sender, 'Not token owner');
        require(IERC721(nftAddress).getApproved(tokenId) == address(this) ||
        IERC721(nftAddress).isApprovedForAll(msg.sender, address(this)),
        'Marketplace not approved');
        
        uint256 commission = (price * commissionPercent)/100;
        listings[listingIdCounter] = Listing({
            listingId: listingId,
            nftAddress: nftAddress,
            seller : msg.sender, 
            tokenId: tokenId,
            price: price,
            active: true,
            commission: commission
    });
    emit NFTListed(listingId, nftAddress, msg.sender, tokenId, price, true, commission);
    }

    function buyNFT(uint256 listingId) external payable {
        Listing storage listing = listings[listingId];
        require(listing.active, 'Not listed');
        require(msg.value == listing.price, 'incorrect price');

        listing.active = false;

        uint256 commission = listing.commission;
        uint256 sellerAmount = listing.price - commission;

         (bool successPayment, ) = payable(listing.seller).call{value: sellerAmount}("");
        require(successPayment, 'Payment failed');

         (bool successTransfer, ) = payable(owner()).call{value: commission}("");
            require(successTransfer, ' Failed commission payment');
        
    
        IERC721(listing.nftAddress).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        emit NFTSold(listing.listingId, msg.sender, msg.value, commission);
    
    }
}