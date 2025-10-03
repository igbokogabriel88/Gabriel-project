import React, { useState } from "react";
import { clearExhibitionError, setExhibitionError } from "../../Redux/Action/Action";
import { validateExhibitionError, errorExhibition } from "../../HelperNft";
import { useDispatch, useSelector } from "react-redux";
import { ProfilePic } from "./Photo";

export const Add_Exhibition =({isAdd})=> {
    const [data, setData] = useState({name: '',
        selectNft: '', description: '', joinFee: '',saleBonus:'',
        image: null});
        const dispatch = useDispatch();
        const Errors = useSelector(state => state.exhibitionError);
    
    const handleChange = (e)=> {
         const {name, value} = e.target;
         setData({...data, [name]: value});

         validateExhibitionError(name, value, dispatch);
    }
    const onhandleFile =(value)=> {
        const name = 'photo';
         setData({...data, photo: value});
         validateMintError(name, value, dispatch);
    }
    console.log('isAdd:', isAdd);
    console.log('file:', data.file);

    const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(data)
            
              dispatch(clearExhibitionError());
              const error = {};
              const loading = false;
              console.log('ISLOADING:',loading);
                await errorExhibition(data, error);
                console.log('EXHIBITION_ERRORS:', error)
            
                const hasErrors = Object.values(error).some(err => err !== '' && err !== null);
                if (hasErrors) {
                    console.log('BLOCKING SUBMIT DUE TO ERRORS')
                    dispatch(setExhibitionError(error))
                    return;
                }
            
               dispatch(clearExhibitionError())
               console.log('EXHIBITION_SUCCESS:');
    
            //     if (mintData && testProfile !== null) {
            //        await handleIPFS();
            //     console.log('ANOTHER_NEW_URI:', urlRef.current);
            //     await mintNFT(urlRef.current, minting, nftAddress,
            //     marketAddress, status, _id, username, mintData.floorPrice.toString());  
            //  }
        };
    return (
        <>
        <div className={`add-more-exhibit ${isAdd ? 'add': ''}`} onSubmit={handleSubmit}>
            <div className="more-exhibit"> 
            <span>Create-Exhibition</span>
            <div className="exhibit-form">
              <ProfilePic
               image={data.image}  
               handleFile={onhandleFile}/>
               {mintError?.photo && 
        <span style={{color: 'red', marginTop: '24px', marginLeft: '82px', position: 'relative'}}>{mintError.photo}</span>}
        
              <div className="exhibition-name">
                <label htmlFor="name">Exhibition Name</label>
                <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                onChange={handleChange}
                className="style-exhibit"
                /></div>
                {Errors?.name && 
        <span style={{color: 'red', marginTop: '24px', marginLeft: '82px', position: 'relative'}}>{Error.name}</span>}
        
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
                value={data.description}
                onChange={handleChange}
                className="style-exhibit"
                /></div>
                <div className="exhibition-join">
                <label htmlFor="join-fee">Join Fee</label>
                <div className="join-input">
                <input
                type="number"
                name="join-fee"
                id="joinFee"
                value={data.joinFee}
                onChange={handleChange}
                className="style-exhibit"
                />
                <span>ETH</span></div>
                <small>min 0.02 ETH</small>
                </div>
                {Errors?.joinFee && 
        <span style={{color: 'red', marginTop: '24px', marginLeft: '82px', position: 'relative'}}>{Errors.joinFee}</span>}
        
                <div className="exhibition-bonus">
                <label htmlFor="join-bonus">Sales bonus</label>
                <div className="join-inputs">
                <input
                type="number"
                name="saleBonus"
                id="sale-bonus"
                value={data.saleBonus}
                onChange={handleChange}
                className="style-exhibits"
                />
                <span>%</span></div>
                <small>min 2%</small>
                </div>
                {Errors?.saleBonus && 
        <span style={{color: 'red', marginTop: '24px', marginLeft: '82px', position: 'relative'}}>{Errors.saleBonus}</span>}
        
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