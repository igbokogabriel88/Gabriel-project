import React, { useEffect, useRef } from "react";
import { NFTContractGallery } from "../NFT_Page";
import { CategoryItem } from "../../FooterPage/CategoryPage/CategoryItem";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import './Cat_Index.css'
const CategoryGroup = ({reset, item})=> {
     const selected = useSelector(state => state.Category);
  const select = selected.name;

    // const currentPage = 1;
    // const totalPage = 50;
    const location = useLocation();
    const categoryRef = useRef(null);
    // const { item} = useParams();

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
      <div style={{width: '96%', marginTop: '20px', paddingTop: '10px'}}>
     
     <span style={{fontSize: '24px', color: 'green', marginLeft: '6px',
      position: 'relative', display: item ? 'none' : ''}}>
      {changeCase(select)} </span>
      <CategoryItem item={item}/>
      <NFTContractGallery 
      item={item}
      selectedCategory={select}
       reset={reset}/>
     </div>
    
      </div>
    )
}
export default CategoryGroup