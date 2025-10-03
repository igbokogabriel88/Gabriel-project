
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../Redux/Action/Action';
import { fetchDummyData } from '../../helperFunc';
import { useParams } from 'react-router-dom';
import { ScrollViewPage } from './ScrollView';
import './Category.css'

export const HorizontalScroll = () => {
       const [nfts, setNfts] = useState([]);
       const {selected} = useParams();
       const dispatch = useDispatch();
       console.log('SELECTED_PARAMS:', selected)
    const selectedCategory = nfts.filter(nft => nft.category === selected);
    const select = selectedCategory.map(item => item.category)
    console.log('CATEGORY_SELECTION:', select[0]);
    console.log('ANOTHRT_CATEGORY_SELECTION:', select);
    // console.log('NFTS_SELECTION:', nfts);
       
    const fetchNFTsData = async () => {
        let result;
        result = await fetchDummyData(dispatch);
        setNfts(result?.data);
        dispatch(fetchData(result?.data))
           };
        
           useEffect(() => {
                fetchNFTsData()
            },[dispatch]);
          
    return(
        <div className='horizon-wrapper'>
            <div className='row-mode'>
             <span style={{ padding: '8px 8px', fontWeight: 'bold'}}>More From {select[0]}</span>
                <span style={{marginRight: '0px', padding: '8px 8px',
                    color: 'rgba(0, 0, 0, 0.7)', backgroundColor: 'rgba(0,0,0, 0.1)',
                    borderRadius: '6px'
                }}>View all</span></div>
                <ScrollViewPage
                products={selectedCategory}
                exhibition = {exhibition}
                 />
        </div>
    )
}
