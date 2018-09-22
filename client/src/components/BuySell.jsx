import React from 'react';
import axios from 'axios';

class BuySell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    };

    this.handleQuantity = this.handleQuantity.bind(this)
    this.buyStocks = this.buyStocks.bind(this)
    this.sellStocks = this.sellStocks.bind(this)
    this.changeQuantity = this.changeQuantity.bind(this)
  }

  componentDidMount() {
    console.log(this.props.stock)
  }

  handleQuantity(e) {
    this.setState({
      quantity: e.target.value
    })
  }

  buyStocks() {
    console.log("im gonna buy all the stocks")
    console.log('Stock: ' + this.props.stock)
    console.log('Quant: ' + this.state.quantity)
    axios.post('/api/buy', {
      userId: this.props.user.uid,
      stock: this.props.stock.quote.symbol,
      quantity: this.state.quantity
    })
      .then((result) => {
        console.log('successful buy')
        this.props.getPortfolioHoldings()
        this.props.toggleModal(null)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  sellStocks() {
    console.log("Im gonna sell it all")
    console.log('Stock: ' + this.props.stock.quote.symbol)
    console.log('Quant: ' + this.state.quantity)
    axios.post('/api/sell', {
      userId: this.props.user.uid,
      stock: this.props.stock.quote.symbol,
      quantity: this.state.quantity
    })
      .then((result) => {
        console.log('successful sell')
        this.props.getPortfolioHoldings()
        this.props.toggleModal(null)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  changeQuantity(change) {
    if (!this.props.sellLimit || ((this.state.quantity + change) !== -1 && (this.state.quantity + change) <= this.props.sellLimit)) {
      this.setState({
        quantity: this.state.quantity + change
      })
    }
  }

  render() {
    if (Object.keys(this.props.stock).length !== 0) {
      return (
        <div className={`modal ${this.props.modalOpen  === true ? 'is-active': null}`} >
          <div className="modal-background" onClick={() => {this.props.toggleModal(null)}}>
          </div>
          <div className="modal-content">

            <div className="column compare">
              <div className="card">
                <div className="card-header">
                  <div className="media">
                    <div className="media-left no-margin">
                      <figure className="image no-margin is-50x50">
                        <img src={this.props.stock.logo.url} />
                      </figure>
                    </div>
                    <div className="media-content this.props.stock-header">
                      <p className="title is-4">{this.props.stock.quote.symbol}</p>
                      <p className="subtitle is-6">{this.props.stock.quote.companyName}</p>
                    </div>
                  </div>
                </div>
                {/* can add any fields returned from the API. these are just starting points */}
                <div className="card-content">
                  <div className="columns">
                    <div className="column">
                      <div>Latest price: <strong>${this.props.stock.quote.latestPrice}</strong></div>
                      <div>Time: <strong>{this.props.stock.quote.latestTime}</strong></div>
                      <div>P/E Ratio:<strong>{this.props.stock.quote.peRatio}</strong></div>
                      <div>Latest EPS:<strong>{this.props.stock.stats.latestEPS}</strong></div>
                      <div>RoE:<strong>{this.props.stock.stats.returnOnEquity}</strong></div>
                      <div>Dividend Yield:<strong>{this.props.stock.stats.dividendYield}</strong></div>
                      <div>Price to Sales:<strong>{this.props.stock.stats.priceToSales}</strong></div>
                      <div>Price to Book:<strong>{this.props.stock.stats.priceToBook}</strong></div>
                      <div>Cash:<strong>${this.props.stock.stats.cash.toLocaleString()}</strong></div>
                    </div>
                    <div className="column">
                      <div>${this.props.stock.quote.latestPrice}</div>
                      <div><u>x {this.state.quantity}</u></div>
                      <div><strong>${this.state.quantity * this.props.stock.quote.latestPrice}</strong></div>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                <a className="card-footer-item" onClick={() => this.changeQuantity(-1)}>-</a>
                <input className="quantity" type="text" onChange={(e) => this.handleQuantity(e)} value={this.state.quantity} ></input>
                <a className="card-footer-item" onClick={() => {this.changeQuantity(1)}}>+</a>

                </div>
                <footer className="card-footer">
                  <a className="card-footer-item" 
                    onClick={() => {
                      if (this.props.buyOrSell === 'Buy') {
                        this.buyStocks();
                      } else {
                        this.sellStocks();
                      }
                    }}
                  >
                    {this.props.buyOrSell}
                  </a>
                  {/* <a className="card-footer-item">Sell</a> */}
                </footer>
              </div>
            </div>

          </div>
          <button className="modal-close is-large" aria-label="close" onClick={() => {this.props.toggleModal(null)}}></button>
        </div>
      );
    } else {
    return (
      <div>

      </div>
    )
  } 
  }
}

export default BuySell;
