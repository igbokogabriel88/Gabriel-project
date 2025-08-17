import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MintProfilePic } from "./Mint_profille";
import Mint_Select from "./Mint_Select";
import './Mint.css'

export const Mint_Nft = () => {
    const [modalDisplay, setModalDisplay] = useState();
    const [mintData, setMintData] = useState({name:'',
        description: '', category: '', floor_price: '',
        photo: null
    });
    const mintRef = useRef(null);
    const selectRef = useRef(null);
    const location = useLocation();
    console.log('modalDisplay:', modalDisplay);

    const nftAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
    const marketAddress = import.meta.env.VITE_MARKETPLACE_ADDRESS;

    useEffect(()=> {
        if (location.state?.focusMintingPage){
            mintRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    },[location]);
    
    useEffect(()=> {
        const modalPage = (e)=>{
            if(modalDisplay && mintRef.current &&
                 mintRef.current.contains(e.target) &&
                !selectRef.current.contains(e.target)){
                    setModalDisplay(false)
                 }
        }
        
        document.addEventListener('mousedown', modalPage);
        return () => {document.removeEventListener('mousedown', modalPage)};
    }, [modalDisplay])
    const handleChange = (e)=> {
            const {name, value} = e.target;
            setMintData({...mintData, [name]: value})
    };
    const handleChangeFunc =(value)=> {
        setMintData({...mintData, category: value})
    };
    const handleFileChange =(value)=> {
        setMintData({...mintData, photo: value})
    };
    const handleSubmit =(e)=> {
        e.preventDefault();
        console.log(mintData)
    };
    const onModalShow =(value)=> {
        setModalDisplay(value)
    }
    return (
        <div className="mint-wrapper" ref={mintRef}>
            <div className="mint-sub-wrapper">
                <span className="mint-title"> Mint</span>
                <div className="mint-form">
                <MintProfilePic handleFile={handleFileChange}/>
                <div className="mint-name">
                <label htmlFor="name"> Name</label>
                <input
                type="text"
                name="name"
                id="name"
                value= {mintData.name}
                onChange={handleChange}
                className="style-exhibit"
                /></div>
                <div className="mint-desc">
                <label htmlFor="description">Description</label>
                <textarea
                type="textarea"
                name="description"
                id="description"
                value= {mintData.description}
                onChange={handleChange}
                className="style-exhibit"
                /></div>
                <Mint_Select 
                onChangeFunc={handleChangeFunc}
                onModalShow={onModalShow}
                show={modalDisplay}
                selectRef={selectRef}
                />
                 <div className="mint-price">
                <label htmlFor="floor-price">Floor Price</label>
                <div className="mint-input">
                <input
                type="number"
                name="floor_price"
                id="floor-price"
                value= {mintData.floor_price}
                onChange={handleChange}
                className="style-exhibit"
                />
                <span>ETH</span></div>
                <small>min 0.02 ETH</small>
                </div>
                <div className="mint-submit">
                    <span onClick={handleSubmit}>Mint</span>
                <small>Minting fee of 0.1 ETH is required to mint an nft</small>
                </div>
                    </div>
                
                </div> </div>
    )
}