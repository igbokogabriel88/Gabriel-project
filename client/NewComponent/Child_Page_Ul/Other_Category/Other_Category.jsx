import React, { useEffect, useRef } from "react";
import { NFTContractGallery } from "../NFT_Page";
// import { PaginationView } from "../../Pagination/Index";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import './Cat_Index.css'
const CategoryGroup = ()=> {
    // const selected = useSelector(state => state.Category);
    // const select = selected.name;

    // const currentPage = 1;
    // const totalPage = 50;
    const location = useLocation();
    const categoryRef = useRef(null);
    const {selected} = useParams();

    useEffect(()=> {
      if (location.state?.focusCategoryPage){
          categoryRef.current?.scrollIntoView({behavior: 'smooth'})
      }
  },[location]);

  const changeCase = (value) => {
  
    return value?.charAt(0).toUpperCase() + value?.slice(1);
  }
    return(
    <div className="other-category" ref={categoryRef}>
      <div style={{width: '80%', marginTop: '10px', paddingTop: '10px'}}>
     
     <span style={{fontSize: '24px', color: 'green',
      position: 'relative'}}>
      {changeCase(selected)} </span>

      <NFTContractGallery selectedCategory={selected}/>
     </div>
    
      </div>
    )
}
export default CategoryGroup