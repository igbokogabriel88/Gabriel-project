import React, { Fragment } from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import './ChildPage.css'
import Categories from "./Categories";;
import CategoryGroup from "./Other_category/Other_Category";
import { FrontPageCategory } from "./Other_Category/FrontCatPage";
// import { Triangle_Rectangle } from "../Icons/TriangleRectangle";
import { ImageViewPage } from "../MainBodyPage/ImageFrontPage/ImageShow";
import { NFTContractGallery } from "./NFT_Page";
import { TermPolicyBody } from "./Other_Category/TermAndPolicy/termsBody";
import { CategoryItem } from "../FooterPage/CategoryPage/CategoryItem";
import { useParams } from "react-router-dom";

const FrontPage = ({scrollValue, closePage})=>{
    const category = useSelector(state => state.Category);
    const termAndPolicy = useSelector(state => state.policyTerm)
    const selected = category.name;
    const {item} = useParams();
      
    return (
    <div className={`front-page ${closePage ? 'close' : ''}`}>
        {/* <Triangle_Rectangle/> */}
         <Categories/>
         <>
          {  selected === 'all' ?
            (<div style={{height: '200px', backgroundColor: 'inherit'}}
          className={`main-body-home ${closePage ? 'close': ''}`}>
            <ImageViewPage/>
            <div style={{ width: '100%'}}
            className="main-body-page">
              <div style={{width: '100%', position: 'relative'}}>
              <FrontPageCategory/>
              </div>
            </div>
            </div>): ['arts', 'gaming', 'photography',
            'exhibition', 'pfps', 'membership'].includes(selected) ? 
            <CategoryGroup selected={selected}/> :
            ['privacy-policy','terms-of-service'].includes(selected) ? 
            <TermPolicyBody data={selected}/> : selected === item ? 
            <CategoryItem/> : ''
           }
            </> 
         </div> 
    )
}
export default FrontPage
