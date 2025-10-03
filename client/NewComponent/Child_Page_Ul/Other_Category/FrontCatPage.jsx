import React, {useState, useEffect} from "react";
import { FilterByCategory } from "../NFT_Filter";
import { fetchData} from "../../helperFunc";
import { fetchNftData } from "../../Redux/Action/Action";
import { useDispatch, useSelector } from "react-redux";

export const FrontPageCategory = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.Loading);
    const nfts = useSelector(state => state.fetchData);
   console.log('Frontend_nfts:', nfts)
           useEffect(() => {
               fetchData(dispatch);
            // dispatch(fetchNftData(result?.data));
       },[]);
      
    return (
        <div>
            <FilterByCategory products={nfts}/>
        </div>
    )

}