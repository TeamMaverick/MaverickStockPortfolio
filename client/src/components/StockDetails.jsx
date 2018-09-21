import React from 'react';
import Peers from './Peers.jsx';
import News from './News.jsx';

const StockDetails = ({ peers, peersQuotes, news }) => {
  console.log("STOCK DETAILS QUOTES", peersQuotes.data);
  console.log("STOCK DETAILS PEERS", peers);
  return(
  <React.Fragment>
    <Peers peers={peers} peersQuotes={peersQuotes.data} />
    <News news={news}/>
  </React.Fragment>
)}

export default StockDetails;