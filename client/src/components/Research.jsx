import React from 'react';
import Axios from 'axios';
// import HealthCheckItem from './HealthCheckItem.jsx';
import StockChart from './StockChart.jsx';
import AddStock from './AddStock.jsx';


class Research extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocksData: [],
      currentStock: {},
      apiWait : false,
    };
    this.getStockInfo = this.getStockInfo.bind(this);
    this.displayStock = this.displayStock.bind(this);
  }

  // call getstockinfo for all stocks passed down in props
  componentDidMount() {
    this.getStockInfo()
    if(this.props.stocks.length > 0){
      this.displayStock(this.props.stocks[0].stock_ticker);
    } else {
      this.displayStock('MSFT');
    }

    setInterval(this.getStockInfo, 1000);
  }

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

  getStockInfo() {
    console.log('does this work', this.props.stocks)
    //create stock array to pass to api
    if (this.props.stocks.length > 0) {

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
    }

  render() {
    return (
      <div className="columns">
        <div className="column check is-two-fifths">
          <div className="HealthCheck">
            <h1 className="healthCheckHeader">Research</h1>
            <AddStock user={this.props.user} getStocks={this.props.getStocks} allStocks={this.props.allStocks}/>
            <div className="columns">
              <div className="column is-2">
                <p className="heading">Symbol</p>
                <ul className="healthCheckStock">
                  {this.props.stocks.map((stock) => <li key={stock.stock_ticker} onClick={() => this.displayStock(stock.stock_ticker)} >{stock.stock_ticker}</li>)}
                </ul>
              </div>
              <div className="column is-4">
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
              <div className="column is-4">
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
              <div className="column is-1">
                <p className="heading">Buy</p>
                <ul>
                  {this.props.stocks.map((stock) => 
                    (
                      <li key={stock.stock_ticker + "-buy"}>
                        <a onClick={() => {this.props.toggleModal(stock.stock_ticker, 'Buy', null)}}>
                          <i className="fas fa-hand-holding-usd" />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="column is-1">
                <p className="heading">-</p>
                <ul>
                  {this.props.stocks.map((stock) => 
                    (
                      <li key={stock.stock_ticker + "-remove"}>
                        <a onClick={() => {this.props.removeStock(stock)}}>
                          <i className="fas fa-trash" />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div> 
        </div>
      </div>
      <div className="column is-three-fifths is-centered">
          {this.state.apiWait ? (<div className="apiWait"><i className="fas fa-pause"></i> Please wait.. API only can we called few times..</div>) : ''}
          {this.state.currentStock.metaData === undefined ? null : (
            <StockChart currentStock={this.state.currentStock} />
          )}
        </div>
    </div>
    );
  }
}

export default Research;
