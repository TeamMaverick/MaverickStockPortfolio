import React from 'react'
import axios from 'axios'
import CompareList from './CompareList.jsx'
import Select from 'react-autocomplete';


export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'search',
      searchInput: '',
      history: [],
      options: [],
      compare: [],
      checked: 0,
    }
    this.onChange = this.onChange.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
    this.submitCompare = this.submitCompare.bind(this)
    this.setView = this.setView.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  onChange(e) {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleInputChange(evt) {
    this.setState({
      searchInput: evt.target.value
        });

    axios.get("/api/allStocks", { params: {stock: evt.target.value} })
    .then(({data}) => {
      console.log(data);
      this.setState({
        options: data
      })
    })
  }

  submitSearch(e, query) {
    e.preventDefault()
    axios.get('/api/search', {
      params: { term: query }})
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

  onCheck() {
    var totalChecked = 0
    var checkboxes = document.getElementsByClassName('checkbox')
    for (var ele of checkboxes) {
      if (totalChecked >= 4) {
      ele.checked = false
    }
      if (ele.checked) {
        totalChecked++
      }
    }
    this.setState({
      checked: totalChecked
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
      compare: checked,
      checked: 0
    }, function() {
      this.setView('compare')
    })
  }

  render() {
    return (
      <div className="container" >
        {this.state.view === 'search' &&
          <React.Fragment>
            <div className="columns search">
              <div className="column is-half">
                <h1 className="title">Search</h1>
                <h2 className="subtitle">Search for any stocks</h2>
                <form onSubmit={(e) => this.submitSearch(e, this.state.searchInput)}>
                  <Select
                    items={this.state.options}
                    shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={(item) => item.label}
                    renderItem={(item, isHighlighted) =>
                      <a><div
                        key={item.id}
                        style={{
                          background: isHighlighted ? '#ffffe6' : 'white',
                          fontSize: isHighlighted ? '16px' : '15px',
                        }}>
                        {item.label}
                      </div>
                      </a>
                    }
                    wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                    value={this.state.searchInput}
                    onChange={this.handleInputChange}
                    onSelect={value => this.setState({ searchInput: (value.substring(0, value.indexOf(':'))) })}
                    inputProps={{ className: 'input', placeholder: 'Search...' }}
                  />
                  <div className="field has-addons">
                    <div className="cent">
                    </div>
                  </div>
                </form>
                <div>
                </div>
              </div>
              <div className="column is-half">
                <h1 className="title">Compare</h1>
                <h2 className="subtitle">Select <strong>{4 - this.state.checked}</strong> more stocks to compare.</h2>
                <button className="button" name="submit" type="submit" onClick={() => this.submitCompare()} >Compare</button>
                <div>
                </div>
              </div>
            </div>
            <div className="column">
              {/* begin table */}
              {<table className="table search is-fullwidth is-striped is-hoverable">
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
                    <th>Own?</th>
                    <th>Compare</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.history.length > 0 &&
                    <React.Fragment>
                      {this.state.history.map((item, i) => (
                        <tr key={item.quote.symbol + '-history'}>
                          <th>{i + 1}</th>
                          <td>{item.quote.symbol}</td>
                          <td>{item.quote.companyName}</td>
                          <td>${item.quote.latestPrice}</td>
                          <td>{item.quote.latestTime}</td>
                          <td>{item.quote.peRatio}</td>
                          <td>{item.stats.latestEPS}</td>
                          <td>{(Math.round(item.quote.peRatio / item.stats.latestEPS * 10) / 10).toFixed(2)}</td>
                          <td>Yes</td>
                          <td>
                            <input className="checkbox" onClick={this.onCheck} index={i} type="checkbox" name={item.quote.symbol} value={item.quote.symbol} />
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
        {this.state.view === 'compare' && <CompareList user={this.props.user} setView={this.setView} stocks={this.state.compare} getPortfolioHoldings={this.props.getPortfolioHoldings} changeView={this.props.changeView} />}
      </div>
    )
  }
}