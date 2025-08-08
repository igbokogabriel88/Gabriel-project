
export const getCurrentPage = (currentPage, totalPage, pagesPerPageGroup) => {
        if (totalPage === 0) return;
        
        if (currentPage < 1){
                currentPage = 1;
        }
         const groupIndex = Math.floor((currentPage - 1) / pagesPerPageGroup);

       const  minPageLimit = groupIndex * pagesPerPageGroup + 1;

//        if ( currentPage % pagesPerPageGroup === 0){
//         minPageLimit -= pagesPerPageGroup
//        }
       

       let maxPageLimit = minPageLimit + pagesPerPageGroup - 1;

       if (maxPageLimit > totalPage) {
        maxPageLimit = totalPage
       };

       const currentPageGroup = [];

       for (let i = minPageLimit; i <= maxPageLimit; i++) {
          currentPageGroup.push(i);
       };
        return currentPageGroup
}
