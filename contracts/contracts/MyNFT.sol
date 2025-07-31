// SPDX-Licence-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URLStorage.sol";
 import "@openzeppelin/contracts/access/Ownable.sol";

 contract MyNFT is ERC721Enumerable, ERC721URLStorage, Ownable {
    uint256 public totalMInted;
    uint256 public mintPrice;
    uint256 treasury;

    struct Metadata {
        string name;
        string category;
        unit256 floorPrice;
    }

    mapping(uint256 => Metadata) public tokenMetadata;

    event NFTMinted(
        uint256 indexed tokenId,
        address indexed minter,
        string name,
        string category,
        string metadataURL,
        uint256 mintPrice);

    constructor(uint256 _fee, address _treasury) ERC721('MyNFT', 'MNFT') {
        mintFee = _fee;
        treasury = _treasury;
    }

    function mint(
        string memory url,
        string memory name,
        string memory category,
         uint256 mintPrice
         ) external payable{
        require(msg.value >= mintFee, 'Insufficient mint fee');
        
        uint256 refund = msg.value - mintFee;
        if (refund > 0) {
            (bool successRefund, ) = payable(msg.sender).call{value: refund}("");
            require(successRefund, 'Refund failed');
        }

        (bool successFee, ) = payable(treasury).call{value: mintFee}("");
        require(successFee, 'Transfer failed')

        uint256 tokenId = totalMinted;
        _safeMInt(msg.sender, tokenId);
        _setTokenURL(tokenId, url);
        totalMInted++;

        emit NFTMinted(tokenId, msg.sender, name, category, metadataURL, mintFee);

        function _burn(uint256 tokenId) internal override(ERC721, ERC721URLStorage){
            super._burn(tokenId);
        }

        function tokenURL(uint256 tokenId) public view override(ERC721, ERC721URLStorage) returns (string memory) {
            return super.tokenURL(tokenId);
        }

        function supportsInterface(bytes4 id) public view override(ERC721, ERC721Enumerable) returns (bool) {
            return super.supportsInterface(id);
        }
    }
 }