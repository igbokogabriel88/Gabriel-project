import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeSearchBox } from "../../Redux/Action/Action";
// import { search_NFT } from "../../Redux/Action/Action";
import '../ChildPage.css'
import { FaTimes } from "react-icons/fa";

export const SearchModal = () => {
    const [searchInput, setSearchInput] = useState('nft £1');
    const searchInputs = useSelector(state => state.search_Reducer);
    const searchModal = searchInputs?.searchOpen;
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setSearchInput(e.target.value);
        dispatch(search_NFT())
    };
    const handleCloseSearchBox =()=> {
           dispatch(closeSearchBox(false))
   }
    console.log('searchInputModal:', searchModal)
    return(
        <div className={`search ${searchModal === true ? 'open': ''}`}> 
        <div className="searchHeading">
            <span>Search</span>
            <span onClick={handleCloseSearchBox}>
                <FaTimes className="searchIcon"/></span>
        </div>
        <div className="searchInputWrapper">
            <input
            type="text"
            value={searchInput}
            onChange={handleChange}
            placeholder="Search for nfts"
            className="searchInput"
            />
        </div>
        </div>
    )
}