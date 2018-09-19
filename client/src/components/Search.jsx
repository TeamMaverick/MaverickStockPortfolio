import React from 'react'
import Axios from 'axios'
import CompareList from './CompareList.jsx'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'search',
      searchInput: '',
      history: [],
      compare: [],
    }
    this.onChange = this.onChange.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
    this.submitCompare = this.submitCompare.bind(this)
    this.setView = this.setView.bind(this)
  }

  onChange(e) {
    this.setState({
      searchInput: e.target.value
    })
  }

  submitSearch(e, query) {
    e.preventDefault()
    Axios.get('/api/search', {
      params: { term: query }
    })
      .then(res => {
        this.setState({
          history: this.state.history.concat(res.data),
          searchInput: ''
        })
      })
      .catch(err => console.log(err))
  }

  setView(view) {
    this.setState({
      view: view
    })
  }

  submitCompare() {
    var checked = []
    var checkboxes = document.getElementsByClassName('checkbox')
    for (var ele of checkboxes) {
      if (ele.checked) {
        checked.push(this.state.history[ele.attributes[1].value])
      }
    }
    this.setState({
      compare: checked
    }, function() {
      this.setView('compare')
    })
  }

  render() {
    return (
      <div className="container">
        {this.state.view === 'search' &&
        <React.Fragment>
        <div className="columns">
          <section>
            <div className="column">
              <h1 className="title">Search</h1>
              <h2 className="subtitle">Select up to 3 stocks to compare.</h2>
              <form onSubmit={(e) => this.submitSearch(e, this.state.searchInput)}>
                <div className="field has-addons">
                  <p className="control">
                    <input className="input" type="ticker" placeholder="Search for a stock" onChange={(e) => this.onChange(e)} value={this.state.searchInput} />
                  </p>
                  <p className="control">
                    <button className="button">
                      Search
                    </button>
                  </p>
                </div>
              </form>
              <div>
                <button className="button" name="submit" type="submit" onClick={() => this.submitCompare()} >Compare</button>
              </div>
            </div>
          </section>
        </div>
        <div className="column">
          {/* begin table */}
          {<table className="table is-striped is-hoverable">
            <thead>
              <tr>
                <th></th>
                <th>Symbol</th>
                <th>Company</th>
                <th>Price</th>
                <th>Latest Time</th>
                <th>P/E Ratio</th>
                <th>EPS</th>
                <th>PEG Ratio</th>
                <th>Compare</th>
              </tr>
            </thead>
            <tbody>
              {this.state.history.length > 0 &&
                <React.Fragment>
                  {this.state.history.map((item, i) => (
                    <tr>
                      <th>{i + 1}</th>
                      <td>{item.quote.symbol}</td>
                      <td>{item.quote.companyName}</td>
                      <td>${item.quote.latestPrice}</td>
                      <td>{item.quote.latestTime}</td>
                      <td>{item.quote.peRatio}</td>
                      <td>{item.stats.latestEPS}</td>
                      <td>{(Math.round(item.quote.peRatio / item.stats.latestEPS * 10) / 10).toFixed(2)}</td>
                      <td>
                        <input className="checkbox" index={i} type="checkbox" name={item.quote.symbol} value={item.quote.symbol} />
                        &nbsp;Select for compare
                        </td>
                    </tr>
                  ))}
                </React.Fragment>}
            </tbody>
          </table>}
          {/* end table */}
        </div>
        </React.Fragment>}
        {this.state.view === 'compare' && <CompareList setView={this.setView} stocks={this.state.compare} />}
      </div>
    )
  }
}

export default Search