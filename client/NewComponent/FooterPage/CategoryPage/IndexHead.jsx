import React, { useState, useEffect, useRef } from "react";
import { fetchDummyData } from "../../helperFunc";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, clearIndex, getCategory } from "../../Redux/Action/Action";
import { ScrollPage } from "./ScrollPageView";
import { useNavigate } from "react-router-dom";
import './Category.css'

export const CategoryHeading = () => {
   const [nfts, setNfts] = useState([]);
   const [isBuying, setIsBuying] = useState(false);
    const [level, setLevel] = useState(0);


const category = useSelector(state => state.Category);
const id = useSelector(state => state.Index.index)

const selected = category.name;
const dispatch = useDispatch();
const navigate = useNavigate();
const verticalScrollRef = useRef(null);


const selectedCategory = nfts.filter(nft => nft.category === selected);
console.log('ANOTHER_SELECTED_CATEGORY:', selectedCategory);

const selectedItem = selectedCategory.find(items => Number(items.index) === Number(id));

// console.log('SELECTED_ITEM:', selectedItem)
// console.log('SELECTED_INDEX:', item);

const convert = (value) => {
    return (value * 18).toFixed(2);
}

// const handleGoback = () => {
//     if (window.history.length > 1){
//         navigate(-1)
//     } else {
//         navigate('/')
//     }
// }
const handleGoback = () => {
    dispatch(clearIndex());
    dispatch(getCategory('all'))
    navigate('/')
}
const fetchNFTsData = async () => {
let result;
result = await fetchDummyData(dispatch);
 console.log('ANOTHER FETCHED DUMMY DATA:', result);
setNfts(result?.data);
dispatch(fetchData(result?.data))
   };

   
   useEffect(() => {
        fetchNFTsData()
    },[dispatch]);

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
        <img src= {`/Upload/${selectedItem?.image}`}
        alt="" style={{width: '100%', height: '430px',
        marginTop: '62px', objectFit: 'cover', marginBottom: '32px'}}/>
       
        <div className="label-group">
            <span className="child-one">{selectedItem?.name}</span>
            <p><span>Owned by:</span><span>{selectedItem?.owner}</span></p>
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
            <div className="des-wrapper"><span>Floor price:</span>
            <span>{selectedItem?.price} ETH 
            <small>{convert(selectedItem?.price)}</small></span></div>
            <div className="submit-item">{isBuying ? 'Buying...' : 'Buy' }</div>
             {/* <HorizontalScroll/> */}
              <ScrollPage 
              selected={selected}
              products={selectedCategory}/>
            
            </div>
       </div>
            
    )
}