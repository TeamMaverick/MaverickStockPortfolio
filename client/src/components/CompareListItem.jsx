import React from 'react'
import axios from 'axios'

class CompareListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.changeQuantity = this.changeQuantity.bind(this)
    this.buyStocks = this.buyStocks.bind(this)
    this.handleQuantity = this.handleQuantity.bind(this)
  }

  handleQuantity(e) {
    this.setState({
      quantity: Number(e.target.value)
    })
  }

  changeQuantity(change) {
    if (this.state.quantity + change !== -1) {
      this.setState({
        quantity: this.state.quantity + change
      })
    }
  }

  buyStocks(stock) {
    console.log(this.props.user)
    axios.post('/api/buy', {
      userId: this.props.user.uid,
      stock: stock.quote.symbol,
      quantity: this.state.quantity
    })
      .then((result) => {
        this.props.getPortfolioHoldings()
        this.props.changeView('home')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="column compare">
      <div className="card">
        <div className="card-header">
          <div className="media">
            <div className="media-left no-margin">
              <figure className="image no-margin is-50x50">
                <img src={this.props.stock.logo.url} />
              </figure>
            </div>
            <div className="media-content stock-header">
              <p className="title is-4">{this.props.stock.quote.symbol}</p>
              <p className="subtitle is-6">{this.props.stock.quote.companyName}</p>
            </div>
          </div>
        </div>
        {/* can add any fields returned from the API. these are just starting points */}
        <div className="card-content">
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
        <div className="card-footer">
        <a className="card-footer-item" onClick={() => this.changeQuantity(-1)}>-</a>
        <input className="quantity" type="text" onChange={(e) => this.handleQuantity(e)} value={this.state.quantity} ></input>
        <a className="card-footer-item" onClick={() => {this.changeQuantity(1)}}>+</a>
        </div>
        <footer className="card-footer">
        <a className="card-footer-item" onClick={() => { this.buyStocks(this.props.stock) }} >Buy</a>
          {/* <a className="card-footer-item">Sell</a> */}
        </footer>
      </div>
    </div>
    )
  }
}

export default CompareListItem