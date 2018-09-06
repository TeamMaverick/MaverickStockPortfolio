import React from 'react';

const HealthCheckItem = (props) => {
  // console.log(props.stock)
  return (
    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Symbol</p>
          <p className="title">{props.stockInfo.quote.symbol}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Today's Change</p>
          <p className="title">
          {props.stockInfo.quote.change < 0 ? <i className="fas fa-arrow-down"></i> : <i className="fas fa-arrow-up"></i>}
           {props.stockInfo.quote.change}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Year-to-Date</p>
          <p className="title">{props.stockInfo.quote.ytdChange < 0 ? <i className="fas fa-arrow-down"></i> : <i className="fas fa-arrow-up"></i>}
           {(props.stockInfo.quote.ytdChange * 100).toFixed(2)}</p>
        </div>
      </div>
    </nav>
  )
}

export default HealthCheckItem;