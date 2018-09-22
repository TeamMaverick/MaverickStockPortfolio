import React from 'react';
import Peers from './Peers.jsx';
import News from './News.jsx';

const StockDetails = ({ currentStock }) => (
  <React.Fragment>
    <Peers currentStock={currentStock}/>
    <News currentStock={currentStock}/> 
  </React.Fragment>
)

export default StockDetails;