import React, { useEffect, useState } from "react";
import { ExhibitionCard } from "./ExhibitionCard";

export const ExhibitionPageView = ({exhibitionId}) => {
    const [hasAccess, setHasAccess] = useState(false);
    const [exhibitionNfts, setExhibitionNfts] = useState([]);
    const [exhibitionData, setExhibitionData] = useState(null);

    useEffect(() => {
        const initialize = async () => {
            const access = await exhibitionContract.hasPaidJoinFee(exhibitionId, currentAddress);
            setHasAccess(access);
        }

        const nfts = getNftsFromBackend(e => e.id === exhibitionId)
        setExhibitionNfts(nfts)
    },[exhibitionId]);

    const handlePurchase = async (nft) => {
        if (!hasAccess) {
            await exhibitionContract.payJoinFee(exhibitionId, {value: joinFee});
            setHasAccess(true);
            return;
        }
        await NFTMarketContract.buyNFT(nft.exhibitionId || exhibitionId, nft.tokenId, {value: nft.price});
         reurn (
            <div>
                {exhibitionNfts.map(nft => (
                    <ExhibitionCard key= {nft.tokenId} 
                      nft= {nft}
                      exhibitiondata= {exhibitionData}
                      onBuy= {handlePurchase} />
                ))}
            </div>
         )
    }
}