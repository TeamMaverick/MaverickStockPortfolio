import React from 'react';
import Peer from './Peer.jsx';

const Peers = ({ currentStock }) => {
  // if (Object.keys(currentStock).length > 0 ) {
  //   console.log("FUCK",currentStock.quote.symbol);
  //   let stock = currentStock.quote.symbol;}
  return (
    <div>
      {currentStock !== undefined && Object.keys(currentStock).length > 0 ? 
        (<h2 className="subtitle">Peer Stocks for {currentStock.quote.symbol}</h2>): (<div></div>)}
      
      <div className="columns">
        {currentStock !== undefined && Object.keys(currentStock).length > 0 ? 
          (currentStock.peers[0].map((peer, idx) => 
            (<Peer key={idx} stock={peer} quote={currentStock.peers[1][peer].quote}/>))) 
              : (<img className="spinner" style={{alignContent: 'center'}}/>)}
      </div>
    </div>
)}


export default Peers;