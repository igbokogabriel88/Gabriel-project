
import React, { useEffect, useRef, useState } from "react";
import './ImageShow.css'
import { fetchDummyData } from "../../helperFunc";
import { fetchData } from "../../helperFunc"; 
// import { fetchData } from "../../Redux/Action/Action";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AboutCompany } from "./AboutCompany";

export const ImageViewPage = () =>{

    const [offset1, setOffset1] = useState(0);
    const [offset2, setOffset2] = useState(0);
    const [offset3, setOffset3] = useState(0);

    const [direction1, setDirection1] = useState(1);
    const [direction2, setDirection2] = useState(-1);
    const [direction3, setDirection3] = useState(1);   
    const [pause, setPause] = useState(false)
    const maxOffset = 200;
    const dir1Ref = useRef(direction1)
    const dir2Ref = useRef(direction2)
    const dir3Ref = useRef(direction3)
    const step = 50;
    const dispatch = useDispatch();
    const refreshLoading = useSelector(state => state.refreshLoading.loading);
    
    const nfts = useSelector(state => state.fetchData);
      console.log('IMAGE_PAGE_NFTS:', nfts)
       
    const filterByNFT = nfts?.map(item => item.nft);
    console.log('Image_view:', nfts);
    console.log('Image_filter:', filterByNFT)
    const artImageGroup = filterByNFT?.filter(nft => nft?.category === 'arts');
       const gamingImageGroup = filterByNFT?.filter(nft => nft?.category === 'gaming');
        const photographyImageGroup = filterByNFT?.filter(nft => nft?.category === 'photography');
      
    console.log('Art_image:', artImageGroup);
    console.log('gaming_image:', gamingImageGroup);
    console.log('photo_image:', photographyImageGroup)
       
        const selectedArtImage = artImageGroup?.slice(0,7);
        const selectedPhotographyImage = photographyImageGroup?.slice(0,7);
        const selectedGamingImage = gamingImageGroup?.slice(0,7);

           
             useEffect(()=>{
            
                const interval1 = setInterval(() => {
                    setOffset1(prev => {
                        const next = prev + step * dir1Ref.current;
                        if (Math.abs(next) >= maxOffset){
                              dir1Ref.current = -dir1Ref.current
                        } 
                     return next
                    });
                    setOffset3(prev => {
                        const next = prev + step * dir3Ref.current;
                        if (Math.abs(next) >= maxOffset){
                          dir3Ref.current = -dir3Ref.current
                        }
                             return next
                    });
                    setOffset2(prev => {
                        const next = prev + step * dir2Ref.current;
                        if (Math.abs(next) >= maxOffset){
                          dir2Ref.current = -dir2Ref.current
                        }
                             return next
                    });
                   
                }, 2000);
                
                return () => {
                    clearInterval(interval1);
                 }
    },[]
    // [direction1, direction2, direction3]
);

    //      const loadImage = (ipfsUrl) => {
    //     let imageHash;
    //     if ( ipfsUrl.startsWith('ipfs://')) {
    //         imageHash = ipfsUrl.replace('ipfs://', '')
    //     }
    //     if (ipfsUrl.startsWith('Qm')) {
    //         imageHash = ipfsUrl;
    //     }
    //     imageHash = `https://ipfs.io/ipfs/${imageHash}`;
    //     console.log('Image_Hash:', imageHash)
    //     return imageHash
    // }

    const convertIpfsUrl = (ipfsUrlData) => {
        let gatewayUrl;
        console.log('IPFS_GATEWAY:', ipfsUrlData);
        const ipfsUrl = ipfsUrlData.trim();
        if (!ipfsUrl) return;
        if ( ipfsUrl.startsWith('ipfs://')) {
            gatewayUrl = ipfsUrl.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')
        }
        if (ipfsUrl.startsWith('https://')) {
            gatewayurl = ipfsUrl;
        }
         if (ipfsUrl.startsWith('Qm')) {
            gatewayUrl = `https://gateway.pinata.cloud/ipfs/${ipfsUrl}`
         }
         console.log('Modified_ipfs:', gatewayUrl);
         return   gatewayUrl;
      }
    
     return (
        <>
         {/* {nfts.length === 0 ? 
            <div className="zero-wrapper">
                <div className="zero-data"><span></span>
                   <span></span>
                   <span></span></div></div> : ''} */}
        <div className={`image-view ${refreshLoading === true ? 'view' : nfts?.length === 0 ? 'hide' : '' }`}>
            <AboutCompany/>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
            <div className={`imageGroups ${refreshLoading === true ? 'view' : '' }`}>
            <div className="image-group one"
              style={{transform: `translateY(${offset1}px)`, 
             transition: 'transform 0.3s'}}
             >
                { selectedArtImage?.map((art, i) => (
                    <img src= {convertIpfsUrl(art.imageUrl)} 
                     key={i} className={`imageClass ${refreshLoading === true ? 'accept' : 'reject'}`}/> 
                ))
             }
            </div>
            </div> 
             <div className="imageGroups">
            <div className="image-group two"
             style={{transform: `translateY(${offset2}px)`,  
             transition: 'transform 0.3s' }}
                >
            {
                selectedGamingImage?.map((gaming, i) => (      
                <img src= {convertIpfsUrl(gaming.imageUrl)}
                 key={i} className={`imageClass ${refreshLoading === true ? 'accept' : 'reject'}`}/> 
                            
                 ))  
            }
            </div>
            </div>
             <div className="imageGroups">
            <div className="image-group three"
            style={{transform: `translateY(${offset3}px)`, 
           transition: 'transform 0.3s' }}
                >
            {
               selectedPhotographyImage?.map((photo, i) => (
                <img src= {convertIpfsUrl(photo.imageUrl)} 
                key={i} className={`imageClass ${refreshLoading === true ? 'accept' : 'reject'}`}/> 
                            
                 )) 
            }
            </div>
            </div>  
            </div>
                    </div> </>
    
    )
}
     // <img src= {`/Upload/${photo.image}`}


