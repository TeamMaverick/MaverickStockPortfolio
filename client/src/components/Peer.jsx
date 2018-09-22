import React from 'react';

const Peer = ({ stock, quote }) => {
  return (
  <div className="column box">
    <h2 className="subtitle">
    {stock}
    </h2>
    <p className="content" style={{display: "inline"}}>
      {quote.change < 0 ? 
        (<i className="fas fa-arrow-down red" />) : 
        (<i className="fas fa-arrow-up green" />)}
      {quote !== undefined && Object.keys(quote).length > 0 ? 
          (<p>{quote.change.toFixed(2)}</p>) :
          (<img className="spinner" style={{alignContent: 'center'}}/>)}
    </p><br/>
    <p style={{display: "inline-block"}}>
      {quote.ytdChange < 0 ? 
        (<i className="fas fa-arrow-down red" />) : 
        (<i className="fas fa-arrow-up green" />)}
      {quote !== undefined && Object.keys(quote).length > 0 ? 
          (<p>{quote.ytdChange.toFixed(2)}</p>) :
          (<img className="spinner" style={{alignContent: 'center'}}/>)}
    </p>
  </div>
)}

export default Peer;