import React from 'react';

const Peer = ({ stock, quote }) => {
  return (
  <div className="column box"
      style={{height: "250px", marginLeft:"3px", marginRight:"3px",
              padding: "20px 30px 30px 30px"}}>
    <h2 className="subtitle">
      <b>{stock}</b>
    </h2>
    <p className="content" style={{display: "inline"}}>
      <span>Daily: </span>
      {quote.change < 0 ? 
        (<i className="fas fa-arrow-down red" style={{marginRight: "10px"}}/>) : 
        (<i className="fas fa-arrow-up green" style={{marginRight: "10px"}}/>)}
      {quote !== undefined && Object.keys(quote).length > 0 ? 
          (<span>{quote.change.toFixed(2)}</span>) :
          (<img className="spinner" style={{alignContent: 'center'}}/>)}
    </p><br/>
    <p style={{display: "inline-block"}}>
      <span>YTD: </span>
      {quote.ytdChange < 0 ? 
        (<i className="fas fa-arrow-down red" style={{marginRight: "10px"}}/>) : 
        (<i className="fas fa-arrow-up green" style={{marginRight: "10px"}}/>)}
      {quote !== undefined && Object.keys(quote).length > 0 ? 
          (<span>{quote.ytdChange.toFixed(2)}</span>) :
          (<img className="spinner" style={{alignContent: 'center'}}/>)}
    </p>
  </div>
)}

export default Peer;