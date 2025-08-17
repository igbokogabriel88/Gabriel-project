import React from "react";
import { useMemo } from "react";
import { getCurrentPage } from "./CurrentPage";
import { useSelector } from "react-redux";
import './Pagination.css'

export const Pagination = (props) => {
      const {currentPage,
            totalPage,
            pagesPerPageGroup,
            handlePreviousButtonClick,
            handleNextButtonClick,
            handlePageChangeButtonClick,
            handlePreviousPageGroupButtonClick,
            handleNextPageGroupButtonClick,
      } = props;

      const category = useSelector(state => state.Category);
      
      const chosenCat =
       ['arts', 'gaming', 'pfps', 'photography', 'exhibition', 'membership'].includes(category);

      const currentPageGroup = useMemo(() => {
        return getCurrentPage(currentPage, totalPage, pagesPerPageGroup);
      },[currentPage, totalPage, pagesPerPageGroup]);

      const _handlePreviousButtonClick = (event) => {
        handlePreviousButtonClick(event, currentPageGroup);
      
      };

      const _handleNextButtonClick = (event) => {
        handleNextButtonClick(event, currentPageGroup);
        
      };

      const _handlePageChange = (event) => {
        handlePageChangeButtonClick(event, currentPageGroup);
       
      };

      const _handlePreviousPageGroupButtonClick = (event) => {
        handlePreviousPageGroupButtonClick(event, currentPageGroup)
      };

      const _handleNextPageGroupButtonClick = (event) => {
        handleNextPageGroupButtonClick(event, currentPageGroup)
      };

      //  console.log('CURRENTPAGE:', currentPage);
      //  console.log('TOTAL_PAGE:', totalPage);
      //  console.log('PAGES_PER_PAGE:', pagesPerPageGroup);
      //  console.log('CURRENT_PAGE_GROUP:', currentPageGroup)
      
      return(
        <div className={`page-wrapper ${totalPage === 0 ? 'show': 
          currentPageGroup.length < 5 ? 'hide' : ''
        }`}>
        <div className={`page-row ${totalPage === 0 ? 'show': 
          currentPageGroup.length < 5 ? 'hide' : ''
        }`}>
          { totalPage === 0 ? '':
            <span
            className="btn-span"
            onClick={_handlePreviousButtonClick}
            > Prev</span>
          }
        
        { totalPage === 0 ? '' :
         currentPageGroup[0] > 1 ?
            <span
            className="span-btn hellip"
            onClick={_handlePreviousPageGroupButtonClick}
            >&hellip;</span> : ''
        }
        {currentPageGroup?.map((pageNumber) => {
        
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
        { totalPage === 0 ? '' : 
        currentPageGroup[currentPageGroup.length - 1] < totalPage ?
            <span
            className="span-btn hellip"
            onClick={_handleNextPageGroupButtonClick}
            >&hellip;</span> : ''
        
        }
        { totalPage === 0 ? '' :
          <span
          className="btn-span"
          onClick={_handleNextButtonClick}
         > Next</span>
 
        }
            </div>

        </div>
      )

}