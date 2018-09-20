import React from 'react';
import axios from 'axios';
// import HealthCheckItem from './HealthCheckItem.jsx';
import StockChart from './StockChart.jsx';

class HealthCheckAPIFIX extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocksData: [],
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
    return axios
      .get('/api/stockInfo', { params: { STOCK: stock } })
      .then(({ data }) => {
        console.log('DISPLAY STOCK', data);
        // if(data.Information){
        //   this.setState({ apiWait : true});
        // } else {
        //   this.setState({ currentStock: data, apiWait : false });
        // }
      })
      .then(() => {
        console.log('GETCHARTDATA', this.state.currentStock.data);
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
    axios.get(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockArr}&types=quote,news,chart&range=1y`
    )
      .then(({ data }) => {
        //save stock info to state
        this.setState({
          stocksData: data
        });
      })
      .then(() => {
        console.log('GETSTOCKINFO', this.state.stocksData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="columns">
        <div className="column check is-one-third">
          <div className="HealthCheck">
            <h1 className="healthCheckHeader">Health Check</h1>
            <div className="columns">
              <div className="column is-one-fifth">
                <p className="heading">Symbol</p>
                <ul className="healthCheckStock">
                  {this.props.stocks.map((stock) => <li key={stock.stock_ticker} onClick={() => this.displayStock(stock.stock_ticker)} >{stock.stock_ticker}</li>)}
                </ul>
              </div>
              <div className="column is-two-fifths">
                <p className="heading">Today's Changes</p>
                <ul>
                  {Object.keys(this.state.stocksData).length > 0 ? Object.keys(this.state.stocksData).map((key) => { return (<li key={key}>{this.state.stocksData[key].quote.change < 0 ? (
                    <i className="fas fa-arrow-down red" />
                  ) : (
                    <i className="fas fa-arrow-up green" />
                  )}
                  {this.state.stocksData[key].quote.change}</li>)}): ''}
                </ul>
              </div>
              <div className="column is-two-fifths">
                <p className="heading">Year-TO-Date</p>
                <ul>
                  {Object.keys(this.state.stocksData).length > 0 ? Object.keys(this.state.stocksData).map((key) => { return (<li key={key}>{this.state.stocksData[key].quote.ytdChange < 0 ? (
                    <i className="fas fa-arrow-down red" />
                  ) : (
                    <i className="fas fa-arrow-up green" />
                  )}
                  {(this.state.stocksData[key].quote.ytdChange * 100).toFixed(2)}</li>)}): ''}
                </ul>
              </div>
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

export default HealthCheckAPIFIX;
