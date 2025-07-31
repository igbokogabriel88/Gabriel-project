import "!@openzeppelin/contracts/token/ERC721/IERC721.sol";
 import "!@openzeppelin/contracts/access/Ownable.sol";
 contract MyNFT is ERC721URLStorage, ownable {
    unit256 public tokeCount;
    constructor() ERC721('MyNFT', 'MNFT') {}
    function mint(string memory _tokenId) external returns (unit){
        tokenCount++;
        _safeMInt(msg.sender, tokenCount);
        _setTokenURL(tokenCount, _tokenId);
        return tokenCount;
    }
 }