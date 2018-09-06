import React from 'react';

const HealthCheckItem = (props) => {
  return (
    <nav className="level is-mobile">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Ticker</p>
          <p className="title">{props.stock.ticker}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Today's Change</p>
          <p className="title"><i className="fas fa-arrow-down"></i> 123</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Year-to-Date</p>
          <p className="title">456K</p>
        </div>
      </div>
    </nav>
  )
}

export default HealthCheckItem;