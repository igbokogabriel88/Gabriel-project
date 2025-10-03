
import React, {useRef, useEffect, useState} from "react";
import { getCategory, setIndex } from "../../../Redux/Action/Action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Category.css';

export const CategoryBody = ({products, selected, loading, perPage, currentPage, item}) =>{

     const [isClick, setIsClick] = useState(false);
     const filterByNFT = products?.map(item => item.nft);
    const filteredCategory = filterByNFT?.filter(product => product?.category === selected);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex +  perPage; 
    const mappingCategory = filteredCategory?.slice(startIndex, endIndex);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const pageRef = useRef(null);

    //  console.log('MAPPED CATEGORY:',mappingCategory)
     console.log('RAW_PRODUCT:',products)
    //  console.log('SELECTED CATEGORY:',selected);

    // useEffect(() => {
    //     if (pageRef.current){
    //      pageRef.current.scrollTo({
    //         top: 0,
    //         bebavior: 'smmoth'
    //      })
    //     }
    //   },[currentPage])

    const handleSelect = (item, value) => {
        console.log('CATEGORY && INDEX:', item, value);
             setIsClick(true);
             const timer = setTimeout(() => {
                setIsClick(false);
                // console.log('CATEGORY_ITEM', item, value)
                 navigate(`/home/${item}`,
                    {state: {focusCategory: true, scrollTo: 'Top',
                        from: localion.patname,
                        previousPage: 'category' 
                    }}
                 );
                 dispatch(getCategory(item));
                 dispatch(setIndex(value))
             },300);
            return () => clearTimeout(timer)
          }

    const convert =(value) => {
        return (value * 16).toFixed(2)
    }
    const loadImage = (ipfsUrl) => {
        let imageHash;
        if ( ipfsUrl.startsWith('ipfs://')) {
            imageHash = ipfsUrl.replace('ipfs://', '')
        }
        if (ipfsUrl.startsWith('Qm')) {
            imageHash = ipfsUrl;
        }
        imageHash = `https://ipfs.io/ipfs/${imageHash}`;
        console.log('Image_Hash:', imageHash)
        return imageHash
    }
   
    return (
    <div className={`categoryTop ${item ? 'hide': ''}`} ref={pageRef}>
    {products.length === 0 ? 
        <div className="categoryTop yes">
        <span>No products available</span>
    </div> : ''}
    {mappingCategory?.map((item, i) => (
    
     <div className={`filtered ${isClick === true ? 'show': !item ? 'yes' :''}`} key={i} onClick = {() => handleSelect(item.category, item._id )}>
      <div className="image-wrappers">
    <img src= {loadImage(item.imageUrl)}
    alt= {item.nftName}
    // src={`/Upload/${item.image}`}
    className="filteredImage"/></div>
    
    <p >{item.nftName}</p>
    <p style={{marginTop: '-12px'}}>{item.ownerName}</p>
    <span style={{display: 'flex', flexDirection: 'row', marginTop: '-12px',
        position: 'relative', justifyContent: 'space-between'
    }}>
    Floor price: 
    <span style={{marginRight: '7px'}}>{item.price}ETH</span></span>
    <span style={{display: 'flex', flexDirection: 'row',  position: 'relative',
        marginTop: '1px', justifyContent: 'space-between', fontSize: '13px'}}>
    <small>USDT</small>
    <small style={{marginRight: '7px'}}>${convert(item.price)}</small></span>
    </div> 
    ))}
               
        </div>
    )
}