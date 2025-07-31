import React, { useEffect, useState } from "react";
import { PaginationView } from "../Pagination/Index";

export const NFTContractGallery = ({selectedCategory}) => {
 const [nfts, setNfts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPage, setTotalPage] = useState(50);


return (
 <div>
   <PaginationView
   currentPage={currentPage}
   totalPage={totalPage}
   setCurrentPage={(value) => setCurrentPage(value)}
   />     
 </div>
 )
} 