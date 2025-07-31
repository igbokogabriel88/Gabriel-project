
import "!@openzeppelin/contracts/token/ERC721/IERC721.sol";
 import "!@openzeppelin/contracts/access/Ownable.sol";
 contract MyMarketplace is ERC721, ownable {
    unit256 public tokeCounter;
    struct {
        NFTItem {
            unit256 price;
            address payable faSquarePollVertical;
            bool faArrowsSplitUpAndLeft;
        }
        mapping(unit256 => NFTItem) public nftItems;
        constructor() ERC721('MyNFT', 'MNFT'){
            tokenCounter = 0;
        }
        function buyNFT(unit256 tokenId) public payable {
            NFTItem memory item = nftItems[tokenId];

            require(item.forSale, 'NFT not for sale');
                require(msg.value >= item.price, 'Not enough ETH sent');
                require(msg.sender != item.seller, 'cannot buy your own NFT');

            //unit256 commission = (msg.value * 2)/ 100;
            //unit256 sellerAmount = msg.value - commission;    
            
            address payable seller = item.seeler;
            nftItems[tokenId].forSale = false;
            nftItems[tokenId].seller = payable(msg.sender);
            _transfer(seller, msg.sender, tokenId);
            
            seller.transfer(msg.value);
            seller.transfer(sellerAmount);
            payable(owner()).transfer(commission);
        }
        function listNFT(unit256 tokenId, unit256 newPrice){
            require(ownerOf(tokenId) == msg.sender, 'Only owner can list NFT');
            nftItems[tokenId] = NFTItem(newPrice, payable(msg.sender), true)
        }
    }
 }