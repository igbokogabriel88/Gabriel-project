import React from "react";
import './Category.css'

export const CategoryLabel = ({items, selected}) => {
    const filteredCategory = items.filter(product => product.category === selected);
    const totalCategoryLength = filteredCategory.length;
    const filteredListedCategory  = items.filter(item => item.listed);
    const listedAmount = filteredListedCategory.length;
    const listedPercent = listedAmount/ totalCategoryLength;
    const totalVolume = filteredCategory.reduce((total, item)=> (
        total += item.price
    ), 0).toFixed(2)
     return (
        <div className="cat-label">
            <div><span className="labelTitle"> Listed percentage:</span> <span>{listedPercent}</span></div>
            <div><span className="labelTitle">Total volume:</span> <span>{totalVolume}</span></div>
            <div><span className="labelTitle">Owners:</span> <span>{}</span></div>
            <div><span className="labelTitle">Unique Owners:</span> <span>{}</span></div>
        </div>
     )

}