
import React, {useRef, useEffect} from "react";
import './Category.css'

export const CategoryBody = ({products, selected, loading, perPage, currentPage, item}) =>
     {
    const filteredCategory = products.filter(product => product.category === selected);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex +  perPage; 
    const mappingCategory = filteredCategory.slice(startIndex, endIndex);

    const pageRef = useRef(null);

    // console.log('FILTERED CATEGORY:',filteredCategory)
    // console.log('DUMMY PRODUCT:',products)
    // console.log('SELECTED CATEGORY:',selected);

    // useEffect(() => {
    //     if (pageRef.current){
    //      pageRef.current.scrollTo({
    //         top: 0,
    //         bebavior: 'smmoth'
    //      })
    //     }
    //   },[currentPage])

    const convert =(value) => {
        return (value * 16).toFixed(2)
    }
   
    return (
    <div className={`categoryTop ${item ? 'hide': ''}`} ref={pageRef}>
        
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