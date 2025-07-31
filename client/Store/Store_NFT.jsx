import { configureStore } from '@reduxjs/toolkit'
 import { applyMiddleware, createStore } from 'redux';
import logger from "redux-logger";
// import { thunk } from 'redux-thunk';
import NFT_Reducer from '../NewComponent/Redux/Reducer/Index';

const NFT_store = configureStore({
    reducer: NFT_Reducer,
 middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat( logger)})
export default NFT_store