import React from 'react';

const HealthCheckItem = (props) => {
  return (
    <div className="container">
      <h2>{props.stock.ticker}</h2>
    </div>
    
  )
}

export default HealthCheckItem;