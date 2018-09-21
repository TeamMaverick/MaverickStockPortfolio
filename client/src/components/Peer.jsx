import React from 'react';

const Peer = ({ stock, quote }) => {
  // console.log("QUOTE", quote);
  // if (Object.keys(quote).length > 0) console.log("CHANGE", quote.data[stock]);
  return (
  <div className="column box">
    <p>
    {stock}
    </p>
    <div style={{display: "inline-block"}}>
    {quote[stock].quote.change < 0 ? 
      (<i className="fas fa-arrow-down red" />) : 
      (<i className="fas fa-arrow-up green" />)}
    {quote !== undefined && Object.keys(quote).length > 0 ? 
        (<p>{quote[stock].quote.change}</p>) :
        (<img className="spinner" style={{alignContent: 'center'}}/>)}
    </div>
  </div>
)}

export default Peer;