import React from "react";
import { useSelector } from "react-redux";
import './Category.css'

export const CategoryLabel = ({items, selected}) => {

    const id = useSelector(state => state.Index.index)

    // console.log('PARAMS_ID:', id)

    const filteredCategory = items.filter(product => product.category === selected);
    const totalCategoryLength = filteredCategory.length;
    const filteredListedCategory  = items.filter(item => item.listed);
    const listedAmount = filteredListedCategory.length;
    const listedPercent = listedAmount/ totalCategoryLength;
    const totalVolume = filteredCategory.reduce((total, item)=> (
        total + item.price
    ), 0).toFixed(2);
    const uniqueOwners = new Set(filteredCategory.map(cat => cat.owner));
    // console.log('UNIQUE_OWNERS:', uniqueOwners)
     const totalUniqueOwners = uniqueOwners.size;
     const owners = filteredCategory.map(cat => cat.owner)
     const uniquePercent = (totalUniqueOwners/owners.length) * 100
     
    // console.log('TOTAL_CATEGORY_LENGTH:', totalCategoryLength);
    // console.log('CHOSEN_CATEGORY:', selected);
     return (
        <div className={`cat-label ${id ? 'hide': ''}`}>
            <div><span className="labelTitle"> Listed percentage:</span> <span>{listedPercent}</span></div>
            <div><span className="labelTitle">Total volume:</span> <span>{totalVolume}</span></div>
            <div><span className="labelTitle">Owners:</span> <span>{owners.length}</span></div>
            <div><span className="labelTitle">Unique Owners:</span>{uniquePercent.toFixed(2)}% <span>{}</span></div>
        </div>
     )

}