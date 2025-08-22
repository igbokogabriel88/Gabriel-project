import React from "react";
import './Overview.css'

export const AccountPage = () => {
    return (
        <div className="overview1">
        <div className="overviewClass">
            <span>Account Balance</span>
            <span>$0.00</span>
        </div>
        <div className="amountClass">
            <div className="amount1">
            <span><img src="/Upload/eth_logo.png" className=""/></span>
            <span><div>ETH<small>(Fee wallet)</small></div>
            <p>usdt value</p></span>
            <span>______________</span>
            <span><div>0.00</div><p>$0</p></span>
            </div>
            <div className="amount2">
            <span><img src="/Upload/image_img1.jpg" className=""/></span>
            <span><div>WETH<small>(Fee wallet)</small></div>
            <p>usdt value</p></span>
            <span>______________</span>
            <span><div>0.00</div><p>$0</p></span>
            </div>
        </div>
        </div>
    )
}