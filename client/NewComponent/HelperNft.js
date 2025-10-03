import React from "react";
import axios from "axios";
import { getProvider } from "./NFTPage/getProvider";
import {removeError, setAlert, loginSuccess, loginFail, loadUser,
  setLoading, clearLoading, setFieldWithdrawalError, setWithdrawalError
  } from "./Redux/Action/Action";
  import { setFieldMintError, setMintError, clearMintError } from "./Redux/Action/Action";
 import Load_User from "./Helper/loadUser";

 const url = 'http://localhost:4200'
 const Headers = {
    headers: {
        'Content-Type' : 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }
};
 const nftAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
 const marketAddress = import.meta.env.VITE_MARKETPLACE_ADDRESS;

export const createNftsUser = async (user) => {
    const {signer, provider} = await getProvider(nftAddress, marketAddress);

      const network = await provider.getNetwork();
      const isLiveNetwork = network.chainId !== 31337;
              
      if (!isLiveNetwork) {
        return;
          }
          const currentUser = await signer.getAddress();
          const backendUser = user.walletAddress;
          if (!backendUser.includes(currentUser)) {
            try{
        console.log('NFTS_USER:',user)
        const res = await axios.post(`${url}/api/auth/nfts`, user, Headers);
        console.log('NFT USER CREATION SUCCESS',res.data?.data);
        dispatch(removeError()); 
    } catch (err) {
        console.log(err)     
    }      
      } else {
        console.log('You are already limked to this wallet')
        
      }
  
    
}


export const validateMintError = (name, value, dispatch) => {
       if(name === 'name'){
      if(value.trim() === '') {
        dispatch(setFieldMintError('name', 'Nft name is required'));
      }  else{ dispatch(setFieldMintError('name', '')); }
     }  else if (name === 'photo') { 
      if (value === null) {
       dispatch(setFieldMintError('photo', 'Photo is required'));
      }  else {
       dispatch(setFieldMintError('photo', ''));
      }
      } else{
     if (value.trim() === '') {
        dispatch(setFieldMintError('price', 'Price is required'));
      } else {
     dispatch(setFieldMintError('price', ''));
     }
    }  
  }

 export const errorMintFunc = (userData, error)=>{
  const {name, photo, floorPrice} = userData;
   
  console.log('MINT_DATA:', userData);
    
    if ( !name || name?.trim === ''){
      error.name = 'Name is required';
    } else {
      error.name = ''
    }
    if (!photo || photo === null){
      error.photo = 'Please add a photo';
    } else { error.photo = null}

     if ( !floorPrice || floorPrice?.trim() === ''){
  error.price = 'Please add a price';    
    }  else { error.price = ''}
  
    //  console.log('ERROR_MINT:',error)
      }

   export const errorWithdrawalFunc = (address, amount, error) => {
     console.log('WITHDRAWAL_DATA:', address, amount);
    
    if ( !address || address?.trim === ''){
      error.address = 'This field is required';
    } else {
      error.address = ''
    }

     if ( !amount || amount === null){
  error.amount = 'Please add amount';    
    }  else { error.amount = ''}
  
}

   export const errorFieldWithdrawal = (name, value, dispatch) => {
     if(name === 'withdrawalAddress'){
      if(value.trim() === '') {
        dispatch(setFieldWithdrawalError('address', 'This field is required'));
      }  else{ dispatch(setFieldWithdrawalError('address', '')); }
     }  else{
     if (value === null) {
        dispatch(setFieldWithdrawalError('amount', 'Amount is required'));
      } else {
     dispatch(setFieldWithdrawalError('amount', ''));
     }
    }  
}

  export const validateExhibitionError = (name, value, dispatch) => {
       if(name === 'name'){
      if(value.trim() === '') {
        dispatch(setFieldExibitionError('name', 'Exhibition name is required'));
      }  else{ dispatch(setFieldExhibitionError('name', '')); }
     }  else if (name === 'photo') { 
      if (value === null) {
       dispatch(setFieldExhibitionError('photo', 'Photo is required'));
      }  else {
       dispatch(setFieldExhibitionError('photo', ''));
      } 
      } else if (name === 'saleBonus') { 
      if (value === '') {
       dispatch(setFieldExhibitionError('saleBonus', 'Sale bonus is required'));
      }  else {
       dispatch(setFieldExhibitionError('saleBonus', ''));
      } 
      } 
      else{
     if (value.trim() === '') {
        dispatch(setFieldExhibitionError('joinFee', 'Join fee is required'));
      } else {
     dispatch(setFieldMintError('joinFee', ''));
     }
    }     
  }

  export const errorExhibition = (data, error) => {
       const {name, photo, saleBonus, joinFee} = data;
   
  console.log('MINT_DATA:', userData);
    
    if ( !name || name?.trim === ''){
      error.name = 'Name is required';
    } else {
      error.name = ''
    }
    if (!photo || photo === null){
      error.photo = 'Please add a photo';
    } else { error.photo = null}

     if ( !saleBonus || saleBonus?.trim() === ''){
     error.saleBonus = 'Please add a sale bonus';    
    }  else { error.joinFee = ''}

    if ( !joinFee || joinFee?.trim() === ''){
     error.joinFee = 'Please add a join fee';    
    }  else { error.joinFee = ''}
  
  
  }