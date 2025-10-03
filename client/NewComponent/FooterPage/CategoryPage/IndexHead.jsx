import React, { useState, useEffect, useRef } from "react";
import { fetchDummyData } from "../../helperFunc";
import { fetchData } from "../../helperFunc"; 
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNftData, clearIndex, getCategory } from "../../Redux/Action/Action";
import { ScrollPage } from "./ScrollPageView";
import { useNavigate } from "react-router-dom";
import './Category.css'

export const CategoryHeading = () => {
   const [isBuying, setIsBuying] = useState(false);
    const [level, setLevel] = useState(0);
    const [hasAccess, setHasAccess] = useState(false);
    const [exhibitionData, setExhibitionData] = useState(null);

const nfts = useSelector(state => state.fetchData);
console.log('CAT_ID_NFTS:', nfts)
   
const category = useSelector(state => state.Category);
const id = useSelector(state => state.Index.index);

const selected = category.name;
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();
const verticalScrollRef = useRef(null);

const filterByNFT = nfts?.map(item => item.nft);
console.log('Index_filterByNFT:', filterByNFT);
// console.log('Index_selected:', selected);
// console.log('Index_nfts:', nfts);
const selectedCategory = filterByNFT.filter(nft => nft?.category === selected);
console.log('ANOTHER_SELECTED_CATEGORY:', selectedCategory);

const selectedItem = selectedCategory.find(items => items._id === id);
console.log('SELECTED_ITEM:', selectedItem);

const nftExhibitionId = selected.exhibition;

 console.log('SELECTED_ITEM_IMAGE:', selectedItem?.imageUrl);
// console.log('SELECTED_INDEX:', item);
const cameFrom = location.state?.from || '/';
const previousPage = location.state?.previousPage || '/';

const convert = (value) => {
    return (value * 18).toFixed(2);
}

  const loadImage = (ipfsUrl) => {
        let imageHash;
        if ( ipfsUrl?.startsWith('ipfs://')) {
            imageHash = ipfsUrl.replace('ipfs://', '')
        }
        if (ipfsUrl?.startsWith('Qm')) {
            imageHash = ipfsUrl;
        }
        imageHash = `https://ipfs.io/ipfs/${imageHash}`;
        console.log('Image_Hash:', imageHash)
        return imageHash
    }

const handleGoback = () => {
    dispatch(clearIndex());
    dispatch(getCategory('all'))
    navigate(cameFrom)
}

const buyFunction = async () => {
     if (nftExhibitionId > 0) {
        //  if (!hasAccess) {
        //     await exhibitionContract.payJoinFee(exhibition.id, { value: exhibition.joinFee});
        //     setHasAccess(true);
        //     return;
        //  }
        alert(`This NFT is part of the ${exhibition.name} exhibition.
         You must join the exhibition to purchase items within it`);
         window.location.href = `/exhibition/${exhibition.id}`
        // await marketplace.buyNFT(nft.tokenId, nft.exhibitionId, { value: nft.price});
     } else {
        await marketplace.buyNFT(nft.tokenId, 0, { value: nft.price})
     }
}
//    useEffect(() => {
//     const checkAccess = async () => {
//         // get exhibitionId from redux;
//         const access = await exhibitionContract.canAccessExhibition(exhibitionId, currentAddress);
//         setHasAccess(access);
//     }
//    }),[exhibitionId, currentAddress];
    useEffect(() => {
    if (nftExhibitionId > 0) {
        exhibition = exhibitionContract.getExhibition(nftExhibitionId);
        setExhibitionData(exhibition);
    }
})    

   
    useEffect(()=>{
        const container = verticalScrollRef.current;
        const handleScroll = () => {
            const maxScroll = container.scrollHeight - container.clientHeight;
            const scrollRatio = container.scrollTop/ maxScroll;
            setLevel(scrollRatio * (container.clientHeight - 70))
        }
        container?.addEventListener('scroll', handleScroll);
        return () => {
            container?.removeEventListener('scroll', handleScroll)
        };
     },[]);
       
     
    return (
        <div className="cat-wrapper">
        <span className="min-span" onClick = {handleGoback}>Back</span>
        <div className="initial-wrapper">
         <img src= {loadImage(selectedItem?.imageUrl)}
        alt= {selectedItem?.nftName} style={{width: '100%', height: '430px',
        marginTop: '0px', objectFit: 'cover', marginBottom: '32px', position: 'absolute'}}/>
        </div>
        <div className="label-group">
        {nfts.length === 0 ? <div className="no-data"></div> : ''}
            <span className="child-one">{selectedItem?.nftName}</span>
            <p><span>Owned by:</span><span>{selectedItem?.ownerName}</span></p>
            <div className="des-item">
                <span>Description ({selectedItem?.category})</span>
                <div style={{position: 'relative'}}
                 ref={verticalScrollRef} className="slice"
                >
                <div className="vertical-scrollbar" 
                 style={{transform: `translateY(${level * 1.84}px)`}}
                ></div>
             <span>{selectedItem?.description} 
              I am Gabriel  I am Gabriel  I am Gabriel
              I am Gabriel  I am Gabriel  I am Gabriel
              I am Gabriel  I am Gabriel  I am Gabriel</span></div>
            </div>
            {exhibitionData && (
                <div> Part of <strong>{exhibitionData.name}</strong></div>
            )}
            <div className="des-wrapper"><span>Floor price:</span>
            <span>{selectedItem?.price} ETH 
            <small>{convert(selectedItem?.price)}</small></span></div>
            <div className="submit-item" onClick={() => buyFunction(selectedItem)}>
                {isBuying ? 'Buying...' : exhibitionData > 0 ? 'Join Exhibition to Buy': 'Buy' }</div>
             {/* <HorizontalScroll/> */}
              <ScrollPage 
              selected={selected}
              products={selectedCategory}/>
            
            </div>
       </div>
            
    )
}

{/* <img src= {`/Upload/${selectedItem?.image}`} */}