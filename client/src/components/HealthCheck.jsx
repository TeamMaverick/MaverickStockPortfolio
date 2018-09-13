import React from 'react';
import Axios from 'axios';
import HealthCheckItem from './HealthCheckItem.jsx';

class HealthCheck extends React.Component {
  constructor(props) {
    super(props);
    this.getStockInfo = this.getStockInfo.bind(this);
    this.state = {
      stocksData: ''
    };
  }

  // call getstockinfo for all stocks passed down in props
  componentDidMount() {
    this.getStockInfo();
  }

  // call stock API to get realtime info for stocks
  getStockInfo() {
    //create stock array to pass to api
    let stockArr = this.props.stocks.map((stock) => {
      return stock.stock_ticker;
    });
    Axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockArr}&types=quote&range=1m&last=5`
    )
      .then(({ data }) => {
        //save stock info to state
        this.setState({
          stocksData: data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="HealthCheck">
        <h1 className="healthCheckHeader">Health Check</h1>
        <div>
          {/* <p>Let's do a quick health check on your {this.props.stocks.length} Stocks</p> */}
          {/* {this.state.stocksData
            ? this.props.stocks.map((stock, i) => {
                return (
                  <HealthCheckItem
                    key={i}
                    stockInfo={this.state.stocksData[stock.stock_ticker]}
                    displayStock={this.props.displayStock}
                  />
                );
              })
            : ''} */}
          <div className="column symbol">
            <p className="heading">Symbol</p>
            <ul>
              {this.props.stocks.map((stock) => <li>{stock.stock_ticker}</li>)}
            </ul>
          </div>
          <div className="column change">
            <p className="heading">Today's Changes</p>
            <ul>
              {this.state.stockInfo.map((info) => <li></li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default HealthCheck;
