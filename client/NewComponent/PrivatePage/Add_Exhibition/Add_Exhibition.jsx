import React, { useState } from "react";
import { ProfilePic } from "./Photo";

export const Add_Exhibition =({isAdd})=> {
    const [data, setData] = useState({name: '',
        selectNft: '', description: '', joinFee: '',saleBonus:'',
        file: null
    })
    
    const handleChange = (e)=> {
         const {name, value} = e.target;
         setData({...data, [name]: value})
    }
    const onhandleFile =(value)=> {
         setData({...data, file: value})
    }
    console.log('isAdd:', isAdd);
    console.log('file:', data.file);
    return (
        <>
        <div className={`add-more-exhibit ${isAdd ? 'add': ''}`}>
            <div className="more-exhibit"> 
            <span>Create-Exhibition</span>
            <div className="exhibit-form">
              <ProfilePic handleFile={onhandleFile}/>
              <div className="exhibition-name">
                <label htmlFor="name">Exhibition Name</label>
                <input
                type="text"
                name="name"
                id="name"
                // value={}
                onChange={handleChange}
                className="style-exhibit"
                /></div>
                <div className="exhibition-select">
                <span>Select nft [Min: 5]</span>
                <span></span>
                </div>
                <div className="exhibition-desc">
                <label htmlFor="description">Description</label>
                <input
                type="textarea"
                name="description"
                id="description"
                // value={}
                onChange={handleChange}
                className="style-exhibit"
                /></div>
                <div className="exhibition-join">
                <label htmlFor="join-fee">Join Fee</label>
                <div className="join-input">
                <input
                type="number"
                name="join-fee"
                id="join-fee"
                // value={}
                onChange={handleChange}
                className="style-exhibit"
                />
                <span>ETH</span></div>
                <small>min 0.02 ETH</small>
                </div>
                {/* <div className="exhibition-join">
                <label htmlFor="join-fee">Join Fee</label>
                <div className="join-input">
                <input
                type="number"
                name="join-fee"
                id="join-fee"
                // value={}
                onChange={handleChange}
                className="style-exhibit"
                />
                <span>ETH</span></div>
                <small>min 0.02 ETH</small>
                </div> */}
                <div className="exhibition-bonus">
                <label htmlFor="join-bonus">Sales bonus</label>
                <div className="join-inputs">
                <input
                type="number"
                name="sale-bonus"
                id="sale-bonus"
                // value={}
                onChange={handleChange}
                className="style-exhibits"
                />
                <span>%</span></div>
                <small>min 2%</small>
                </div>
                <div className="exhibition-submit">
                    <span>Create Exhibition</span>
                <small>Fee required 0.2 ETH</small>
                </div>
            </div>
            </div>
            </div>
        </>
    )
}