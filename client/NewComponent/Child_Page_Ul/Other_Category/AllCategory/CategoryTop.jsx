import React from "react";
import './Category.css'

export const CategoryBody = ({products, selected, loading, perPage, currentPage}) =>
     {
    const filteredCategory = products.filter(product => product.category === selected);
    const mappingCategory = filteredCategory.slice((currentPage - 1), perPage)

    console.log('FILTERED CATEGORY:',filteredCategory)
    console.log('DUMMY PRODUCT:',products)
    console.log('SELECTED CATEGORY:',selected);

    const convert =(value) => {
        return (value * 16).toFixed(2)
    }
   
    return (
    <div className="categoryTop">
        
    {mappingCategory.map((item, i) => (
     loading === true ? <div className="filtered yes"></div> :
     <div className="filtered" key={i}>
    <img 
    src={`/Upload/${item.image}`}
    className="filteredImage"/>
    <p >{item.name}</p>
    <p style={{marginTop: '-12px'}}>{item.owner}</p>
    <span style={{display: 'flex', flexDirection: 'row', marginTop: '-12px',
        position: 'relative', justifyContent: 'space-between'
    }}>
    Floor price: 
    <span style={{marginRight: '7px'}}>{item.price}ETH</span></span>
    <span style={{display: 'flex', flexDirection: 'row',  position: 'relative',
        marginTop: '1px', justifyContent: 'space-between', fontSize: '13px'}}>
    <small>USDT</small>
    <small style={{marginRight: '7px'}}>${convert(item.price)}</small></span>
    </div>
    ))}
               
        </div>
    )
}