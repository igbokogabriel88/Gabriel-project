import React, { useRef, useState, useEffect } from "react";
import { TopPageData } from "../DataCollection/data";
import { IndicatorTracker } from "./IndicatorTracker";
import { getCategory } from "../Redux/Action/Action";
import { useSelector, useDispatch } from "react-redux";
import { CategoryItem } from "../FooterPage/CategoryPage/CategoryItem";
import { TermPolicyHeader } from "./Other_Category/TermAndPolicy/termsHeader";
import { useLocation, useParams } from "react-router-dom";
import { SetCurrentPage, clearIndex } from "../Redux/Action/Action";
import { fetchDummyData } from "../helperFunc";
import { fetchData } from "../helperFunc";


const Categories = ({onReset})=> {
const [indicatorPosition, setIndicatorPosition]= useState(0);
const [highlight, setHighlight] = useState(false);

const scrollRef = useRef(null);
// const termAndPolicyRef = useRef(null);
const nfts = useSelector(state => state.fetchData);
  console.log('CATEGORIES_NFTS:', nfts)
   

const dispatch = useDispatch();
const category = useSelector(state => state.Category);

const selected = category.name;

const id = useSelector(state => state.Index.index)
   //  console.log('PARAMS_ID:', id);

const mainCategory = 
  ['arts', 'gaming', 'photography', 'membership', 'pfps', 'exhibition'].includes(selected);
  //  console.log('SELECTED_CATEGORY:', selected)
  const privacyCategory =  
  ['privacy-policy', 'terms-of-service'].includes(selected);
  
  const filterByNFT = nfts?.map(item => item.nft);
  console.log('FilteedByNFT:', filterByNFT)
  const filtered = filterByNFT.filter(nft => nft?.category === selected);
  console.log('Categories_Nfts:', nfts);
  console.log('Categories_filtered:', filtered);
  console.log('Categories_select:', selected);

  const selectedImage = filtered[0]?.imageUrl;
  const minImage = filtered[1]?.imageUrl;
  console.log('SELECTED_IMAGE:', selectedImage);
  console.log('MIN_IMAGE:', minImage)
  
   
// useEffect(()=> {
// if (location.state?.focusTermAndPolicyPage){
// termAndPolicyRef.current?.scrollIntoView({behavior: 'smooth'})
//             }
// },[location]);
      
useEffect(()=>{
const container = scrollRef.current;
const handleScroll = () => {
const maxScroll = container.scrollWidth - container.clientWidth;
const scrollRatio = container.scrollLeft/ maxScroll;
setIndicatorPosition(scrollRatio * (container.clientWidth - 70))
 }
container?.addEventListener('scroll', handleScroll);
return () => {
container?.removeEventListener('scroll', handleScroll)
};
},[]);

useEffect(()=>{
if ( selected){
 setHighlight(true);
const timeId = setTimeout(()=> {
setHighlight(false)
}, 200);
return ()=> clearTimeout(timeId)
 }
},[selected])

const handleCategory =(value)=>{
dispatch(clearIndex());
dispatch(getCategory(value));
   onReset(1)
};
const loadImages = (ipfsUrl) => {
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

// console.log('highlight:', highlight)
return (<>{ ['privacy-policy', 'terms-of-service'].includes(selected) ?
<TermPolicyHeader/> :
<div style={{display: 'flex', flexDirection: 'column'}} >
<div className={`category ${ mainCategory ? 'select': ''}
${['privacy-policy', 'terms-of-service'].includes(selected) ? 'hide' : ''}
${Number(id) ? 'YES' : ''} ${selected === 'all' ? 'All' : ''}`} ref={scrollRef}
style={{backgroundImage: `url(${loadImage(selectedImage)})`}}
>
{TopPageData.map(data => (
<span className={`span-class ${selected === data.value  ? 'chose' : ''}`}
style={{backgroundColor: highlight && 
selected === data.value? 'red':
selected === data.value ? 'rgba(0, 0, 0, 0.2)': ''
}} 
key={data.value}
onClick={()=> handleCategory(data.value)}>
{data.label}</span>
))}
<div className={`small-image ${mainCategory ? 'show' : ''}`}
style={{backgroundImage: `url(${loadImage(minImage)})`}}> </div>
</div>

<IndicatorTracker 
selected= {selected}
value={indicatorPosition} />
</div> }
</>
    )
}
export default Categories







