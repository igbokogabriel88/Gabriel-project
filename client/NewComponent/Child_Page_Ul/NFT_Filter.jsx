import React, { useEffect, useState } from "react";
import axios from "axios";
import { groupByCategory } from "./nftsHelper";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, setIndex } from "../Redux/Action/Action";
import { useNavigate } from "react-router-dom";
import './NFTs.css'

export const FilterByCategory = ({products}) => {
     console.log('Filter_Fetch_Data:', products)
     const filterByNFT = products?.map(item => item.nft);
    //  console.log('Filter_By-Nft:', filterByNFT);
    const [isClick, setIsClick] = useState(false);
    const groupedProducts =  groupByCategory(filterByNFT);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.Loading);
       const refreshLoading = useSelector(state => state.refreshLoading.loading);
    // console.log('LOADING_CATEGORY:', loading);

    const rate = 18;
    // console.log('GROUP BY CATEGORY:', groupedProducts);


    const handleViewAll = (value) => {
            console.log('FRONT_PAGE_CATEGORY:', value)
           navigate(`/home/${value}`, 
            {state: {focusCategory: true, scrollTo: 'term'}}
           );
           dispatch(getCategory(value))
    };
    const convert =( value) => {
        const converted = (value * rate).toFixed(2);
        return `${converted}`
    };
    const changeCase = (value) => {
  
        return value.charAt(0).toUpperCase() + value.slice(1);
      };
      const handleSelect = (item, value) => {
         setIsClick(true);
         const timer = setTimeout(() => {
            setIsClick(false);
            console.log('CATEGORY_ITEM', item, value)
             navigate(`/home/${item}`,
                {state: {focusCategory: true, scrollTo: 'top',
                    from: location.pathname,
                    previousPage: ''
                }}
             );
             dispatch(getCategory(item));
             dispatch(setIndex(value))
         },300);
        return () => clearTimeout(timer)
      }

    //   const convertIpfsUrl = (ipfsUrlData) => {
    //     let gatewayUrl;
    //     console.log('IPFS_GATEWAY:', ipfsUrlData);
    //     const ipfsUrl = ipfsUrlData?.trim();
    //     if (!ipfsUrl) return;
    //     if ( ipfsUrl.startsWith('ipfs://')) {
    //         gatewayUrl = ipfsUrl.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')
    //     }
    //     if (ipfsUrl.startsWith('https://')) {
    //         gatewayurl = ipfsUrl;
    //     }
    //      if (ipfsUrl.startsWith('Qm')) {
    //         gatewayUrl = `https://gateway.pinata.cloud/ipfs/${ipfsUrl}`
    //      }
    //      console.log('Modified_ipfs:', gatewayUrl);
    //      return gatewayUrl;
    //   }
    
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

    return (
        <>{products?.length === 0 ? 
        <div className="fetch-top"> 
            <div className="fetch-page"> 
                <span></span><span></span></div></div> : ''}
        <div className={`categoryMain ${refreshLoading === true ? 'view' : ''}`}>
        {Object.entries(groupedProducts || {}).map(([category, items]) => (
         <div key={category} style={{marginTop: '8px'}}>
            <div className="header"><h3>{changeCase(category)}</h3>
            <span onClick={ () => handleViewAll(category)}
            style={{cursor: 'pointer'}}>view all</span></div>
           <div className="categoryWrapper" >
           <div className="categoryScroll">
           <div className="categoryRow"> 
            {items?.map((product, i) => (
                <div key={i} className={`categorySpan ${isClick === true ? 'shows': ''}
                ${refreshLoading === true ? 'view': ''}`} onClick={() => handleSelect(category,product._id)}>
                      <img src= {loadImage(product?.imageUrl)}
                    alt={product?.nftName}
                    className="nftImage"/>
                    <p style={{marginLeft: '7px'}}>{product?.nftName}</p>
                    <p style={{marginTop: '-12px', marginLeft: '7px'}}>{product?.ownerName}</p>
                    <div className="header inner">
                            Floor price:
                        <p style={{marginRight: '12px', fontSize: 'bolder'}}>{product?.price} ETH</p>
                        </div>
                        <span style={{display: 'flex', flexDirection: 'row',
                            marginTop: '-22px', justifyContent: 'space-between', color: 'rgba(0, 0, 0, 0.7)'
                        }}><small style={{marginLeft: '7px', font: '13px'}}>
                            USDT</small>
                        <small style={{marginRight: '12px', font: '13px'}}>
                            ${convert(product?.price)}</small></span>
                </div> 
            ))}
           
     </div>

           </div>
                      </div>
           
     </div>
     
      ))}
        </div> </>
    )
    
}