//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface INFT {
    function safeTransferFrom(address from, address to, unit tokenId) external;

}
contract NFTMarketplace {
    struct Listing {
        unit tokenId;
        address nftAddress;
        address faSquarePollVertical;
        unit price;
    }
    mapping(unit => Listing) public listings;
    unit public listingId;

    function listNFT( address _nftAddress, unit _tokenId, unit _price) extewrnal{
        INFT(_nftAddress).safeTransferFrom(msg.sender. address(this), _tokkenId);
        listingId++;
        listings[listingId] = Listing(_tokenId, nftAddress, msg.sender, _price);
    }
    function buyNFT(unit _listingId) external payable {
        Listing memory item = listings[_listingId];
        require(msg.value >= item.price, 'Not enough ETH');

        //transfer ETH to seller
        payable(item.seller).transfer(item.price);
        //transfer NFT to buyer
        INFT(item.nftAddress).safeTransferFRom(address(this), msg.sender, item.tokenId);
        
        //delete listing
        delete listings[_listingId]
    }
}