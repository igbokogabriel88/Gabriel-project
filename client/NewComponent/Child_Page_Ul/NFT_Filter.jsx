import React, { useState } from "react";
import { groupByCategory } from "./nftsHelper";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, setIndex } from "../Redux/Action/Action";
import { useNavigate } from "react-router-dom";
import './NFTs.css'

export const FilterByCategory = ({products}) => {

    const [isClick, setIsClick] = useState(false);
    const groupedProducts =  groupByCategory(products);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.Loading);
    // console.log('LOADING_CATEGORY:', loading);

    const rate = 18;
    // console.log('GROUP BY CATEGORY:', groupedProducts);

    const handleViewAll = (value) => {
            console.log('FRONT_PAGE_CATEGORY:', value)
           navigate(`/home/${value}`, 
            {state: {focusCategory: true, scrollTo: 'term'}}
           );
           dispatch(getCategory(value))
    };
    const convert =( value) => {
        const converted = (value * rate).toFixed(2);
        return `${converted}`
    };
    const changeCase = (value) => {
  
        return value.charAt(0).toUpperCase() + value.slice(1);
      };
      const handleSelect = (item, value) => {
         setIsClick(true);
         const timer = setTimeout(() => {
            setIsClick(false);
            console.log('CATEGORY_ITEM', item, value)
             navigate(`/home/${item}`,
                {state: {focusCategory: true, scrollTo: 'top'}}
             );
             dispatch(getCategory(item));
             dispatch(setIndex(value))
         },300);
        return () => clearTimeout(timer)
      }

    return (
        <div className="categoryMain">
        {Object.entries(groupedProducts).map(([category, items]) => (
         <div key={category} style={{marginTop: '8px'}}>
            <div className="header"><h3>{changeCase(category)}</h3>
            <span onClick={ () => handleViewAll(category)}
            style={{cursor: 'pointer'}}>view all</span></div>
           <div className="categoryWrapper" >
           <div className="categoryScroll">
           <div className="categoryRow"> 
            {items.map((product, i) => (
                loading === true ? <div className="categorySpan yes"></div> :
                <div key={i} className={`categorySpan ${isClick === true ? 'show': ''}`} onClick={() => handleSelect(category,product.index)}>
                    <img src={`/Upload/${product.image}`} 
                    alt="product.name"
                    className="nftImage"/>
                    <p style={{marginLeft: '7px'}}>{product.name}</p>
                    <p style={{marginTop: '-12px', marginLeft: '7px'}}>{product.owner}</p>
                    <div className="header inner">
                            Floor price:
                        <p style={{marginRight: '12px', fontSize: 'bolder'}}>{product.price} ETH</p>
                        </div>
                        <span style={{display: 'flex', flexDirection: 'row',
                            marginTop: '-22px', justifyContent: 'space-between', color: 'rgba(0, 0, 0, 0.7)'
                        }}><small style={{marginLeft: '7px', font: '13px'}}>
                            USDT</small>
                        <small style={{marginRight: '12px', font: '13px'}}>
                            ${convert(product.price)}</small></span>
                </div>
            ))}
           
     </div>

           </div>
                      </div>
           
     </div>
     
      ))}
        </div>
    )
    
}