import React, { useEffect, useState} from "react";
import { PaginationView } from "../Pagination/Index";
import { useSelector, useDispatch } from "react-redux";
import { fetchDummyData } from "../helperFunc";
import { fetchData, SetCurrentPage } from "../Redux/Action/Action"; 
import { CategoryLabel } from "./Other_Category/AllCategory/CatLabel";
import { CategoryBody } from "./Other_Category/AllCategory/CategoryTop";

export const NFTContractGallery = ({selectedCategory, reset, item}) => {
 const [nfts, setNfts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPage, setTotalPage] = useState(null);

  const perPage = 10;
  const filteredcategory = nfts.filter(nft => nft.category === selectedCategory);
  // console.log('FILTERED_CATEGORY_LENGTH:', filteredcategory.length);

 const dispatch = useDispatch();

 const loading = useSelector(state => state.Loading);
//  const currentPage = useSelector(state => state.fetchPage);
   // console.log('REDUX_CURRENT_PAGE:', currentPage);
      
 const fetchNFTsData = async () => {
  let result;
     result = await fetchDummyData(dispatch);
    // console.log('FETCHED DUMMY DATA:', result);
    setNfts(result?.data);
    dispatch(fetchData(result?.data))
 };
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
   setCurrentPage={(value) => setCurrentPage(value)}
   />     
 </div>
 )
} 