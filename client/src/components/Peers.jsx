import React from 'react';
import Peer from './Peer.jsx';

const Peers = ({ currentStock, peersQuotes }) => {
  // if (Object.keys(currentStock).length > 0 ) {
  //   console.log("FUCK",currentStock.quote.symbol);
  //   let stock = currentStock.quote.symbol;}
  return (
    <div>
      {/* <h2 className="subtitle">Peer Stocks for ${stock}</h2> */}
      <div className="columns border">
        {currentStock !== undefined && Object.keys(currentStock).length > 0  ? 
          (currentStock.peers.map((peer, idx) => 
            (<Peer key={idx} stock={peer} quote={peersQuotes}/>))) 
              : (<img className="spinner" style={{alignContent: 'center'}}/>)}
      </div>
    </div>
)}


export default Peers;