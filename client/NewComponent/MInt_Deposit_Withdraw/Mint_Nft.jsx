import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MintProfilePic } from "./Mint_profille";
import Mint_Select from "./Mint_Select";
import { validateMintError, errorMintFunc } from "../HelperNft";
import { useDispatch, useSelector } from "react-redux";
import { uploadTOIPFS } from "../HelperIPFS";
import { mintNFT } from "../NFTPage/mintFunc";
import './Mint.css'
import { setMintError, clearMintError, clearPhoto } from "../Redux/Action/Action";

export const Mint_Nft = () => {
    const [modalDisplay, setModalDisplay] = useState();
    const [mintData, setMintData] = useState({name:'',
        description: '', category: '', floorPrice: '',
        photo: null });
    const [mintPrice, setMintPrice] = useState('0.1');
    // const [URI, setURI] = useState(null);
    const [testProfile, setTestProfile] = useState(null);
    const [tokenURI, setTokenURI] = useState(null);
    const [imageHash, setImageHash] = useState(null);
    const [selectedExhibition, setSelectedExhibition] = useState(null);
    console.log('Mint_Profile:', mintData.photo)

    const mintRef = useRef(null);
    const selectRef = useRef(null);
    const urlRef = useRef(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const mintError = useSelector(state => state.mintError);
    const walletAddress = useSelector(state => state.fetchWallet);
    const profile = useSelector(state => state.profile);
    const auth = useSelector(state => state.Auths);
     const {_id, username} = auth.user;
    //  console.log('TOKEN_URI:', tokenURI);
    const nftAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
    const marketAddress = import.meta.env.VITE_MARKETPLACE_ADDRESS;
    const chosenProfile = mintData.photo;
    const exhibitionId = location.state?.exhibitionId || 0;

    let status;
    
    useEffect(() => {
         if (exhibitionId > 0) {
            loadExhibitionDetails(exhibitionId);
         }
    },[exhibitionId])
    useEffect(() => {
        if (mintData.photo !== null) {
            setTestProfile(profile)
        }
    },[mintData, profile]);
              
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
    }, [modalDisplay]);

    const handleChange = (e)=> {
            const {name, value} = e.target;
            setMintData({...mintData, [name]: value});

             validateMintError(name, value, dispatch);
    };
      
    const loadExhibitionDetails = async (id) => {
        const exhibition = await exhibitionContract.getExhibition(id);
            setSelectedExhibition(exhibition);

         }
    const handleChangeFunc =(value)=> {
        const name = 'category';
        setMintData({...mintData, category: value});

        validateMintError(name, value, dispatch);
    };

    const handleFileChange =(value)=> {
        const name = 'photo';
        setMintData({...mintData, photo: value});

        validateMintError(name, value, dispatch);
    };
     
    const handleIPFS = async () =>{
            try{
              const ipfsUri = await uploadTOIPFS(mintData, testProfile);
              console.log('IPFS:', ipfsUri)
              setTokenURI(ipfsUri?.value.tokenId);
              setImageHash(ipfsUri?.value.imageHash);
              urlRef.current = ipfsUri?.value.tokenId;
               setMintData({name:'',
               description: '',
               category: 'Select category', 
               floorPrice: '',
               photo: null });
               dispatch(clearPhoto());     
            } catch (err) {
             console.error('IPFS upload failed:', err)
            }
        }
        const handleSelectExhibition = () => {
            setSelectedExhibition(null);
            Navigate('/mint', { replace: true, state: {}})
        }
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(mintData);
        
          dispatch(clearMintError);
          const error = {};
          const minting = false;
          console.log('MINTING:',minting);
            await errorMintFunc(mintData, error);
            console.log('MINT_ERRORS:', error)
        
            const hasErrors = Object.values(error).some(err => err !== '' && err !== null);
            if (hasErrors) {
                console.log('BLOCKING SUBMIT DUE TO ERRORS')
                dispatch(setMintError(error))
                return;
            }
        
           dispatch(clearMintError())
           console.log('MINT_SUCCESS:');

            if (mintData && testProfile !== null) {
               await handleIPFS();
            console.log('ANOTHER_NEW_URI:', urlRef.current);
            await mintNFT(urlRef.current, minting, nftAddress,
            marketAddress, status, _id, username, mintData.floorPrice.toString()), exhibitionId  
         }
    };
    const onModalShow =(value)=> {
        setModalDisplay(value)
    }
    return (
        <div className="mint-wrapper" ref={mintRef}>
            {exhibitionId > 0 && selectedExhibition && (
                <div><span>Minting into: {selectedExhibition.name}</span>
                <p>This NFT will be part of the {selectedExhibition.name} exhibition</p>
                </div>
            )}
            <div className="mint-sub-wrapper">
                <span className="mint-title"> Mint</span>
                <div className="mint-form">
                <MintProfilePic handleFile={handleFileChange}/>
                {mintError?.photo && 
        <span style={{color: 'red', marginTop: '24px', marginLeft: '82px', position: 'relative'}}>{mintError.photo}</span>}
        
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
                {mintError?.name && 
        <span style={{color: 'red', marginTop: '4px', marginLeft: '16px', position: 'relative'}}>{mintError.name}</span>}
        
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
                {mintError?.description && 
        <span style={{color: 'red', marginTop: '0px', marginLeft: '16px', position: 'relative'}}>{mintError.description}</span>}
        
                <Mint_Select 
                data={mintData.category}
                onChangeFunc={handleChangeFunc}
                onModalShow={onModalShow}
                show={modalDisplay}
                selectRef={selectRef}
                />
                {mintError?.category && 
        <span style={{color: 'red', marginTop: '4px',marginLeft: '16px', position: 'relative'}}>{mintError.category}</span>}
        
               
                 <div className="mint-price">
                <label htmlFor="floor-price">Floor Price</label>
                <div className="mint-input">
                <input
                type="number"
                name="floorPrice"
                id="floor-price"
                value= {mintData.floorPrice}
                onChange={handleChange}
                className="style-exhibit"
                />
                <span>ETH</span></div>
                <small>min 0.02 ETH</small>
                </div>
                {mintError?.price && 
        <span style={{color: 'red', marginTop: '4px', marginLeft: '16px', position: 'relative'}}>{mintError.price}</span>}
             {exhibitionId && exhibitionId === 0 ? (
                <div>
                    <p>want to mint into a curated exhibition?</p>
                    <Link to = '/exhibition'>Browse Exhibitions</Link>
                </div>
             ) : (<div>
                    <p>Prefer to mint to the public marketplace?</p>
                    <span onClick={handleSelectExhibition}>Browse Exhibitions</span>
                </div>)}
                <div className="mint-submit">
                    <span onClick={handleSubmit}>Mint</span>
                <small>Minting fee of 0.1 ETH is required to mint an nft</small>
                </div>
                    </div>
                
                </div> </div>
    )
}