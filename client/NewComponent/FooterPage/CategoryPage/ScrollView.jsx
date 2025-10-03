import React from "react";
import { useSelector } from "react-redux";

export const ScrollViewPage = ({products}) => {
    const loading = useSelector(state => state.Loading);
    console.log('SCROLL_VIEW:', products)
    return (
        <div className="scroll-area">{
            products.map(product =>(
                <div className="scrollGroup" key={product.index}>{loading === true ? 
                    <span className="scroll-loading"></span> : 
                    <span className="image-load"><img src= {product.imageUrl}
                     alt="" style={{width: '100%', height: '60%', objectFit: 'cover3'}}/></span>
                }</div>
            ))
        }</div>
    )
}