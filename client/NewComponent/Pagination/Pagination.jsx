import React from "react";
import { useMemo } from "react";
import { getCurrentPage } from "./CurrentPage";
import './Pagination.css'

export const Pagination = (props) => {
      const {currentPage,
            totalPage,
            pagesPerPageGroup,
            handlePreviousButtonClick,
            handleNextButtonClick,
            handlePageChangeButtonClick,
            handlePreviousPageGroupButtonClick,
            handleNextPageGroupButtonClick
      } = props;

      const currentPageGroup = useMemo(() => {
        return getCurrentPage(currentPage, totalPage, pagesPerPageGroup);
      },[currentPage, totalPage, pagesPerPageGroup]);

      const _handlePreviousButtonClick = (event) => {
        handlePreviousButtonClick(event, currentPageGroup)
      };

      const _handleNextButtonClick = (event) => {
        handleNextButtonClick(event, currentPageGroup)
      };

      const _handlePageChange = (event) => {
        handlePageChangeButtonClick(event, currentPageGroup)
      };

      const _handlePreviousPageGroupButtonClick = (event) => {
        handlePreviousPageGroupButtonClick(event, currentPageGroup)
      };

      const _handleNextPageGroupButtonClick = (event) => {
        handleNextPageGroupButtonClick(event, currentPageGroup)
      };

      console.log('CURRENTPAGE:', currentPage);
      console.log('TOTAL_PAGE:', totalPage);
      console.log('PAGES_PER_PAGE:', pagesPerPageGroup);
      console.log('CURRENT_PAGE_GROUP:', currentPageGroup)
      
      return(
        <div className="page-wrapper">
        <div className="page-row">
        <span
        className="btn-span"
        onClick={_handlePreviousButtonClick}
        > Prev</span>
        {
         currentPageGroup[0] > 1 && 
            <span
            className="span-btn hellip"
            onClick={_handlePreviousPageGroupButtonClick}
            >&hellip;</span> 
        }
        {currentPageGroup.map((pageNumber) => {
        
            return(
                <span
                key={pageNumber}
                id= {pageNumber}
                onClick={() => _handlePageChange(event)}
                className="span-btn"
                style={{
                    backgroundColor: currentPage === pageNumber ?
                    'green' : null
                }}> {pageNumber}</span>
            )
        })}
        {
        currentPageGroup[currentPageGroup.length - 1] < totalPage && 
            <span
            className="span-btn hellip"
            onClick={_handleNextPageGroupButtonClick}
            >&hellip;</span>
        
        }
        <span
         className="btn-span"
         onClick={_handleNextButtonClick}
        > Next</span>


            </div>

        </div>
      )

}