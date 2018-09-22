import React from 'react';
import Peers from './Peers.jsx';
import News from './News.jsx';

const StockDetails = ({ currentStock }) => {
  console.log("STOCK DETAILS CURRENTSTOCK", currentStock);
    // console.log("STOCK DETAILS QUOTES", peersQuotes.data);
    // console.log("STOCK DETAILS PEERS", currentStock.peers);
    // console.log("STOCK DETAILS STOCK", currentStock.quote.symbol);

  return(
  <React.Fragment>
    <Peers currentStock={currentStock}/>
    <News currentStock={currentStock}/> 
  </React.Fragment>
)}

export default StockDetails;