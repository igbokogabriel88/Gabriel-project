import React, { useState } from "react";
import { Pagination } from "./Pagination";
// import { getCurrentPage } from "./CurrentPage";
import { SetCurrentPage } from "../Redux/Action/Action";
import { useDispatch, useSelector } from "react-redux";
import './Pagination.css'

export const PaginationView = ({currentPage, totalPage, selected, item, products,
    setCurrentPage}) => {
      const dispatch = useDispatch();
      const reduxPage = useSelector(state => state.fetchPage);
      // console.log('REDUX_PAGES:', reduxPage);    
    const handlePreviousPage = (event, currentPageGroup) => {
      
       if (currentPage > 1) {
         setCurrentPage( currentPage - 1);
         dispatch(SetCurrentPage(currentPage - 1))
       } 
      };

     
    const handleNextPage = (event, currentPageGroup) => {
        
         if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
            dispatch(SetCurrentPage(currentPage + 1));
         } }

      const handleCurrentPage = (event, currentPageGroup) => {
         const newPage = Number(event.target.id);
         if (newPage >= 1 && newPage <= totalPage) {
            setCurrentPage(newPage);
            dispatch(SetCurrentPage(newPage))
         } 

     };


     const handlePreviousPageGroup = (event, currentPageGroup) => {
      console.log('PREV_HELLIP CICK!!!')
      const prevPage = currentPageGroup[0] - 1; 
         if( prevPage >= 1) {
        setCurrentPage(prevPage)
     };
   }

     const handleNextPageGroup = (event, currentPageGroup) => {
      console.log('NEXT_HELLIP CLICK!!!')
      const nextPage = currentPageGroup[currentPageGroup.length -1] + 1
        if ( nextPage <= totalPage){
        setCurrentPage(nextPage)
        }
     };

     return (
        <div className={`page-wrapper ${item ? 'none': products.length === 0 ? 'hide' : ''}`}>
        <Pagination
        currentPage = {currentPage}
        totalPage = {totalPage}
        pagesPerPageGroup = {5}
        handlePreviousButtonClick = {handlePreviousPage}
        handleNextButtonClick = {handleNextPage}
        handlePageChangeButtonClick = {handleCurrentPage}
        handlePreviousPageGroupButtonClick = {handlePreviousPageGroup}
        handleNextPageGroupButtonClick = {handleNextPageGroup}
        selected = {selected}
        />
        </div>
        
     )
   
}