import React from "react";

const saleTransaction = [{label: 'Nft Name', value: 'nft-name'},
    {label: 'Amount', value: 'amount'},
    {label: 'Buyer', value: 'buyer'},
    {label: 'Sales Commission', value: 'status'} ]

    const buyTransaction = [{label: 'Nft Name', value: 'nft-name'},
        {label: 'Amount', value: 'amount'},
        {label: 'Seller', value: 'seller'},
        ]
        export const Sale_Transaction = ()=> {
            return (
                <div className="nfts-transaction-row">{saleTransaction.map((data, i)=>
                    <span key={i}>{data.label}</span>
                )}</div>
            )
        }

        export const Buy_Transaction = ({selected})=> {
            return (
         <div className={`nfts-transaction-row ${selected === 'bought'? 'yes': ''}`}>
                    {buyTransaction.map((data, i)=>
                    <span key={i}>{data.label}</span>
                )}</div>
            )
        }