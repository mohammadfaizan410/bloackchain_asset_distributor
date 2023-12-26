import React from "react";


export default function Investment() {
    return(
        <div>
<div className='investment-form'>
            <label>Investment Amount:</label>
            <input type='number' name='investmentAmount' placeholder='ETH'/>
            <button type='button' onClick={() =>{
                // sendBalanceToContract(account, abi, contractAddress);
              }}>Invest</button>
              <h1>Your balance with us: </h1>
              </div>
                      </div>
    )
};