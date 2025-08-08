import React, { useRef, useState, useEffect } from "react";
import { TopPageData } from "../DataCollection/data";
import { IndicatorTracker } from "./IndicatorTracker";
import { getCategory } from "../Redux/Action/Action";
import { useSelector, useDispatch } from "react-redux";
import { TermPolicyHeader } from "./Other_Category/TermAndPolicy/termsHeader";
import { useLocation, useParams } from "react-router-dom";
import { fetchDummyData } from "../helperFunc";


const Categories = ()=> {
const [indicatorPosition, setIndicatorPosition]= useState(0);
const [highlight, setHighlight] = useState(false);
const [nfts, setNfts] = useState([]);
const scrollRef = useRef(null);
// const termAndPolicyRef = useRef(null);

const dispatch = useDispatch();
const category = useSelector(state => state.Category);
const fetched = useSelector(state => state.fetchData);
const selected = category.name;

const {item} = useParams();
const mainCategory = 
  ['arts', 'gaming', 'photography', 'membership', 'pfps', 'exhibition'].includes(selected);
  console.log('MAIN_CATEGORY:', mainCategory)
  const privacyCategory =  
  ['privacy-policy', 'terms-of-service'].includes(selected);

  const filtered = nfts.filter(nft => nft.category === selected);

  const selectedIamge = filtered[0]?.image;
  const minImage = filtered[1]?.image;
  console.log('SELECTED_IMAGE:',selectedIamge)
  
  const fetchNFTsData = async () => {
    let result;
       result = await fetchDummyData(dispatch);
      console.log('FETCHED DUMMY DATA:', result);
      setNfts(result?.data);
  
   }
   useEffect(() => {
       fetchNFTsData()
   },[]);
  
 console.log('FETCHED_DATA:',filtered);

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
container.addEventListener('scroll', handleScroll);
return () => {
container.removeEventListener('scroll', handleScroll)
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
console.log('categoryz:', value);
dispatch(getCategory(value));
};
console.log('highlight:', highlight)
return (<>{ ['privacy-policy', 'terms-of-service'].includes(selected) ?
<TermPolicyHeader/> :
<div style={{display: 'flex', flexDirection: 'column'}} >
<div className={`category ${ mainCategory ? 'select': ''}
${['privacy-policy', 'terms-of-service'].includes(selected) ? 'hide' : ''}`} ref={scrollRef}
style={{backgroundImage: `url(/Upload/${selectedIamge})`}}>
{TopPageData.map(data => (
<span className={`span-class ${selected === data.value  ? 'chose': ''}`}
style={{backgroundColor: highlight && 
selected === data.value? 'red':
selected === data.value ? 'rgba(0, 0, 0, 0.2)': ''
}} 
key={data.value}
onClick={()=> handleCategory(data.value)}>
{data.label}</span>
))}
{mainCategory && <div className="small-image"
style={{backgroundImage: `url(/Upload/${minImage})`}}> </div>}
</div>

<IndicatorTracker 
selected= {selected}
value={indicatorPosition} />
</div> }
</>
    )
}
export default Categories







