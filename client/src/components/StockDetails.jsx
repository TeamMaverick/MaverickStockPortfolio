import React from 'react';
import Peers from './Peers.jsx';
import News from './News.jsx';

const StockDetails = ({ peers, news }) => (
  <div>
    <Peers peers={peers} />
    <News news={news}/>
  </div>
)

export default StockDetails;