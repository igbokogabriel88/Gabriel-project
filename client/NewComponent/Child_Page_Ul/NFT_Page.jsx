import React, { useEffect, useState, useCallback} from "react";
import { PaginationView } from "../Pagination/Index";
import { useSelector, useDispatch } from "react-redux";
import { fetchDummyData } from "../helperFunc";
import { fetchData } from "../helperFunc";
import { fetchNftData, SetCurrentPage } from "../Redux/Action/Action"; 
import { CategoryLabel } from "./Other_Category/AllCategory/CatLabel";
import { CategoryBody } from "./Other_Category/AllCategory/CategoryTop";

export const NFTContractGallery = ({selectedCategory, reset, item}) => {
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPage, setTotalPage] = useState(null);
  
  const nfts = useSelector(state => state.fetchData);
  console.log('CAT_PAGE_NFTS:', nfts)
        
  const perPage = 10;
  const filterByNFT = nfts?.map(item => item.nft)
  const filteredcategory = filterByNFT?.filter(nft => nft?.category === selectedCategory);

 const dispatch = useDispatch();

 const loading = useSelector(state => state.Loading);
    
    useEffect(() => {
       if (reset){
        setCurrentPage(reset);
        dispatch(SetCurrentPage)
       }
    },[reset])

  useEffect(() => {
      if (filteredcategory.length > 0){
         setTotalPage(Math.ceil(filteredcategory.length/ perPage))
      } else {
        setTotalPage(0);
      }
  },[filteredcategory, perPage]);
  // console.log('TORAL_PAGE:', totalPage)

  useEffect(() => {
    if (totalPage !== null)
{
   //  console.log('TOTAL_PAGE:', totalPage)
}
},[totalPage]);

 
return (
 <div>
  <CategoryLabel 
  items={nfts}
  selected={selectedCategory}/>

   <CategoryBody 
   item={item}
   products={nfts}
   loading={loading}
   perPage={perPage}
   currentPage={currentPage}
   selected={selectedCategory}
   />
   <PaginationView
    item={item}
   currentPage={currentPage}
   totalPage={totalPage}
   products={nfts}
   setCurrentPage={(value) => setCurrentPage(value)}
   />     
 </div>
 )
} 