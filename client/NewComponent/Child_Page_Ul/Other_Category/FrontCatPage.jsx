import React, {useState, useEffect} from "react";
import { FilterByCategory } from "../NFT_Filter";
import { fetchDummyData } from "../../helperFunc";
import { useDispatch } from "react-redux";

export const FrontPageCategory = () => {
    const [nfts, setNfts] = useState([]);
    const dispatch = useDispatch();

    const fetchNFTsData = async () => {
        let result;
           result = await fetchDummyData(dispatch);
          console.log('FETCHED DUMMY DATA:', result);
          setNfts(result?.data)
       }
       useEffect(() => {
           fetchNFTsData()
       },[dispatch]);
       console.log('FETCH NFTs SUCCESSFUL:', nfts);
      
    return (
        <div>
            <FilterByCategory products={nfts}/>
        </div>
    )

}