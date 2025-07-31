import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import './ChildPage.css'
import Categories from "./Categories";
// import { CategoryPage } from "./Category";
import CategoryGroup from "./Other_category/Other_Category";
// import { Triangle_Rectangle } from "../Icons/TriangleRectangle";
import { ImageViewPage } from "../MainBodyPage/ImageFrontPage/ImageShow";
import { NFTContractGallery } from "./NFT_Page";

const FrontPage = ({scrollValue, closePage})=>{
    const category = useSelector(state => state.Category);
    const selected = category.name
      
    return (
    <div className={`front-page ${closePage ? 'close' : ''}`}>
        {/* <Triangle_Rectangle/> */}
         <Categories/>
         <>
          { selected === 'all' ?
            (<div style={{height: '200px', backgroundColor: 'inherit'}}
          className={`main-body-home ${closePage ? 'close': ''}`}>
            <ImageViewPage/>
            <div style={{ width: '100%', backgroundColor: 'gray'}}
            className="main-body-page">
              <div style={{width: '80%', position: 'relative'}}>
              <NFTContractGallery selectedCategory={selected}/>
              </div>
            </div>
            </div>): <CategoryGroup/>}
            </> 
         </div> 
    )
}
export default FrontPage
