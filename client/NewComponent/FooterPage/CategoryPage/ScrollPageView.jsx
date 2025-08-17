import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearIndex } from "../../Redux/Action/Action";
import { groupByCategory } from "../../Child_Page_Ul/nftsHelper";
import './Category.css'

export const ScrollPage = ({products, selected}) => {
    const loading = useSelector(state => state.Loading);
    const grouped = groupByCategory(products)
    const testCat = products[0];

    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('grouped_CATEGORY:', grouped)
    console.log('PRODUCTS:', products)
    console.log('TEST_CAT:', testCat)
    const rating = 18;
    

    const changeCase = (value) => {
  
        return value.charAt(0).toUpperCase() + value.slice(1);
      };
      const convert = (value) => {
         return (value * rating).toFixed(2)
      }

      const handleViewAll = (value) => {
        dispatch(clearIndex());
        navigate(`/home/${selected}`)
      }

    return (
        <div className="categoryMain1">
        {Object.entries(grouped).map(([category, items]) => (
         <div key={category} style={{marginTop: '8px'}}>
            <div className="headers"><h3>More From {changeCase(category)}</h3>
            <span onClick={ () => handleViewAll(category)}
            style={{cursor: 'pointer'}}>view all</span></div>
           <div className="categoryWrappers" >
           <div className="categoryScrolls">
           <div className="categoryRows"> 
            {items.map((product, i) => (
                loading === true ? <div className="categorySpans yes"></div> :
                <div key={i} className="categorySpans" onClick={() => handleSelect(category,product.index)}>
                    <img src={`/Upload/${product.image}`} 
                    alt="product.name"
                    className="nftImage"/>
                    <p style={{marginLeft: '7px', marginTop: '6px'}}>{product.name}</p>
                    <p style={{marginTop: '-12px', marginLeft: '7px'}}>{product.owner}</p>
                    <div className="headers inner">
                            Floor price:
                        <p style={{marginRight: '12px', fontSize: 'bolder'}}>{product.price} ETH</p>
                        </div>
                        <span style={{display: 'flex', flexDirection: 'row',
                            marginTop: '-12px', justifyContent: 'space-between', color: 'rgba(0, 0, 0, 0.7)'
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