import React, { useEffect, useState } from "react";
import { PaginationView } from "../Pagination/Index";
import { useSelector, useDispatch } from "react-redux";
import { fetchDummyData } from "../helperFunc";
import { fetchData } from "../Redux/Action/Action"; 
import { CategoryLabel } from "./Other_Category/AllCategory/CatLabel";
import { CategoryBody } from "./Other_Category/AllCategory/CategoryTop";

export const NFTContractGallery = ({selectedCategory}) => {
 const [nfts, setNfts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPage, setTotalPage] = useState(20);

  const perPage = 10;
  const filteredcategory = nfts.filter(nft => nft.category === selectedCategory);
  console.log('FILTERED_CATEGORY_LENGTH:', filteredcategory.length)
  const pageTotal = filteredcategory.length/ perPage;
  console.log('DIVIDED_CATEGORY:', pageTotal)

 const dispatch = useDispatch();

 const loading = useSelector(state => state.Loading);
    console.log('LOADING_CATEGORY:', loading);
   
 const fetchNFTsData = async () => {
  let result;
     result = await fetchDummyData(dispatch);
    console.log('FETCHED DUMMY DATA:', result);
    setNfts(result?.data);
    dispatch(fetchData(result?.data))
 }
//   useEffect(() => {
//       setTotalPage(pageTotal);
//   },[]);

 useEffect(() => {
     fetchNFTsData()
 },[dispatch]);
//  console.log('FETCH NFTs SUCCESSFUL:', nfts);

return (
 <div>
  <CategoryLabel 
  items={nfts}
  selected={selectedCategory}/>

   <CategoryBody 
   products={nfts}
   loading={loading}
   perPage={perPage}
   currentPage={currentPage}
   selected={selectedCategory}
   />
   <PaginationView
   currentPage={currentPage}
   totalPage={totalPage}
   setCurrentPage={(value) => setCurrentPage(value)}
   />     
 </div>
 )
} 