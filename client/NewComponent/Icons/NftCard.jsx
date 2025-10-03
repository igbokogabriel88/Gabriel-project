import React, { useState } from "react";
import './Icons.css'

export const NftCard = ({item, loadImage, handleListing}) => {
    const [price, setPrice] = useState();
    const [resetId, setResetId] = useState(false);

     const handleResetId = (value) => {
          setResetId(value)
     }
     const handleRemoveId = () => {
          setResetId(null)
     }

     const handleChange = (e) => {
      setPrice(e.target.value)
     }
     const convert = (value) => {
       return value.charAt(0).toUpperCase() + value.slice(1)
     }

    return (
        <div className="list-wrapper">
                <div className="card-one"><h3>{item?.nftName}</h3>
                <span className="list-cat">{convert(item?.category)}</span>
                {resetId !== item?._id ? 
                <small style={{marginTop: '2px', fontSize: '12px', color: 'rgba(0,0,0, 0.8'}}>
                   { price ? price : item?.price} ETH</small> :
                <input 
                type="number"
                value={price}
                placeholder="Price"
                onChange={handleChange}
                className="card-input"/>} 
                {resetId !== item?._id ?
                <span onClick={() =>handleResetId(item?._id)} className={`list-cards ${resetId !== item?._id ? 'yes' : 'no'}`}>
                  List price</span> :
                <span onClick={handleRemoveId} className={`list-cards ${resetId !== item?._id ? 'yes' : 'no'}`}>Save price</span> 
                    }
                </div>
                    <div><span className="card">
                      <img src= {loadImage(item?.imageUrl)}
                      alt=""
                      style={{width: '100%', height: '100%', objectFit: 'cover'}}/></span>
                      <span className="list-card" 
                      onClick={() =>
                        handleListing( item?.tokenId, price || item?.price, item?.nftAddress)}>List</span></div>
        
        </div>
    )
}