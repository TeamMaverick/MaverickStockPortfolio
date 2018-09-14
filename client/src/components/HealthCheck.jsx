import React from 'react';
import Axios from 'axios';
import HealthCheckItem from './HealthCheckItem.jsx';
import StockChart from './StockChart.jsx';


class HealthCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocksData: '',
      currentStock: {},
      apiWait : false
    };
    this.getStockInfo = this.getStockInfo.bind(this);
    this.displayStock = this.displayStock.bind(this);

  }

  // call getstockinfo for all stocks passed down in props
  componentDidMount() {
    this.getStockInfo();

    if(this.props.stocks.length > 0){
      this.displayStock(this.props.stocks[0].stock_ticker);
    } else {
      this.displayStock('MSFT');
    }
  }

 //called when a ticker symbol on the stocks list is clicked
  //requests the data for that ticker symbol and deposits it in the state
  displayStock(stock) {
    return Axios
      .get('/api/stockInfo', { params: { STOCK: stock } })
      .then(({ data }) => {
        if(data.Information){
          this.setState({ apiWait : true});
        } else {
          this.setState({ currentStock: data, apiWait : false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      <div className="columns">
        <div className="column check">
          <div className="HealthCheck">
            <h1 className="healthCheckHeader">Health Check</h1>
            <div>
              {/* <p>Let's do a quick health check on your {this.props.stocks.length} Stocks</p> */}
              {this.state.stocksData
                ? this.props.stocks.map((stock, i) => {
                    return (
                      <HealthCheckItem
                        key={i}
                        stockInfo={this.state.stocksData[stock.stock_ticker]}
                        displayStock={this.displayStock}
                      />
                    );
                  })
                : ''}
            </div>
          </div>
        </div> 
        <div className="column is-two-thirds is-centered">
          {this.state.apiWait ? (<div className="apiWait"><i className="fas fa-pause"></i> Please wait.. API only can we called few times..</div>) : ''}
          {this.state.currentStock.metaData === undefined ? null : (
            <StockChart currentStock={this.state.currentStock} />
          )}
        </div>
      </div>
    );
  }
}

export default HealthCheck;
