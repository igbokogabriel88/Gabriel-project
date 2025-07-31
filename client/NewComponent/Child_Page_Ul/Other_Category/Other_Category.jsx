import React from "react";
import { NFTContractGallery } from "../NFT_Page";
// import { PaginationView } from "../../Pagination/Index";
import { useSelector } from "react-redux";
import './Cat_Index.css'
const CategoryGroup = ()=> {
    const selected = useSelector(state => state.Category);
    const select = selected.name;

    const currentPage = 1;
    const totalPage = 50;
    return(
    <div className="other-category">
      <div style={{width: '80%'}}>
     <NFTContractGallery selectedCategory={select}/>
     </div>
      Other category
      {/* <PaginationView
      currentPage={currentPage}
      totalPage={totalPage}
      setCurrentPage={}
      /> */}
      </div>
    )
}
export default CategoryGroup