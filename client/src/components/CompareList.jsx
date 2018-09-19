import React from 'react'

class CompareList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    { console.log(this.props.stocks) }
    return (
      <div className="container">
        <button className="button" onClick={() => this.props.setView('search')}>Back to Search</button>
        <div className="columns">
          {this.props.stocks &&
            <React.Fragment>
              {this.props.stocks.map(stock => (
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <div className="media vcenter">
                        <div className="media-left">
                          <figure className="image is-50x50">
                            <img src={stock.logo.url} />
                          </figure>
                        </div>
                        <div className="media-content ">
                          <p className="title is-4">{stock.quote.symbol}</p>
                          <p className="subtitle is-6">{stock.quote.companyName}</p>
                        </div>
                      </div>
                    </div>
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