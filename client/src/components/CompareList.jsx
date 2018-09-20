import React from 'react'

class CompareList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.changeQuantity = this.changeQuantity.bind(this)
  }

  handleQuantity(e) {
    this.setState({
      quantity: e.target.value
    })
  }

  changeQuantity(change) {
    if (this.state.quantity + change !== -1) {
    this.setState({
      quantity: this.state.quantity + change
    })
  }
  }

  render() {
    { console.log(this.props.stocks) }
    return (
      <div className="container">
        <button className="button compare" onClick={() => this.props.setView('search')}>Back to Search</button>
        <div className="columns">
          {this.props.stocks &&
            <React.Fragment>
              {this.props.stocks.map(stock => (
                <div className="column compare">
                  <div className="card">
                    <div className="card-header">
                      <div className="media">
                        <div className="media-left no-margin">
                          <figure className="image no-margin is-50x50">
                            <img src={stock.logo.url} />
                          </figure>
                        </div>
                        <div className="media-content stock-header">
                          <p className="title is-4">{stock.quote.symbol}</p>
                          <p className="subtitle is-6">{stock.quote.companyName}</p>
                        </div>
                      </div>
                    </div>
                    {/* can add any fields returned from the API. these are just starting points */}
                    <div className="card-content">
                      <div>Latest price: <strong>${stock.quote.latestPrice}</strong></div>
                      <div>Time: <strong>{stock.quote.latestTime}</strong></div>
                      <div>P/E Ratio:<strong>{stock.quote.peRatio}</strong></div>
                      <div>Latest EPS:<strong>{stock.stats.latestEPS}</strong></div>
                      <div>RoE:<strong>{stock.stats.returnOnEquity}</strong></div>
                      <div>Dividend Yield:<strong>{stock.stats.dividendYield}</strong></div>
                      <div>Price to Sales:<strong>{stock.stats.priceToSales}</strong></div>
                      <div>Price to Book:<strong>{stock.stats.priceToBook}</strong></div>
                      <div>Cash:<strong>${stock.stats.cash.toLocaleString()}</strong></div>
                    </div>

                    <div className="card-footer">
                    <a className="card-footer-item" onClick={() => this.changeQuantity(-1)}>-</a>
                    <input className="quantity" type="text" onChange={(e) => this.handleQuantity(e)} value={this.state.quantity} ></input>
                    <a className="card-footer-item" onClick={() => {this.changeQuantity(1)}}>+</a>

                    </div>
                    <footer className="card-footer">
                      <a className="card-footer-item">Buy</a>
                      {/* <a className="card-footer-item">Sell</a> */}
                    </footer>
                  </div>
                </div>
              ))}
            </React.Fragment>}
        </div>
      </div>
    )
  }
}

export default CompareList;