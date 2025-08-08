import React from "react";

export const groupByCategory = (products, limit = true) => {
    const grouped = products.reduce((groups, product) => {
        const category = product.category;
        if (!groups[category]){
            groups[category] = [];
        }
        groups[category].push(product);
        return groups;
    },{});

    if(limit){
        for (const category in grouped){
            grouped[category] = grouped[category].slice(0,20);
        }
    }
    return grouped;
}