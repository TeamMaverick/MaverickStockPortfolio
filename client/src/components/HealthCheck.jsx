import React from 'react';
import Axios from 'axios';
// import HealthCheckItem from './HealthCheckItem.jsx';
import StockChart from './StockChart.jsx';

var HealthCheck = ({currentStock}) => (
  <div>
      {currentStock.quote ? (
        <StockChart currentStock={currentStock} />
      ): (<img className="spinner" style={{alignContent: 'center'}}/>
        ) }
  </div>
)

export default HealthCheck;
