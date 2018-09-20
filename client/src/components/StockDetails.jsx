import React from 'react';
import StockChart from './StockChart.jsx';

const StockDetails = ({ currentStock }) => (
  <div className="columns">
    <div className="column check is-one-third">
    </div>
    <div className="column is-two-thirds is-centered">
      <StockChart currentStock={currentStock} />
    </div>
  </div>
);

export default StockDetails;
