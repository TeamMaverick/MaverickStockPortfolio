import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddStock from './components/AddStock.jsx';
import ListOfStocks from './components/ListOfStocks.jsx';
import Research from './components/Research.jsx';
import SortBy from './components/SortBy.jsx';
import PortfolioPChart from './components/PortfolioPChart.jsx'; 
import SignIn from './components/SignIn.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view : 'signin',
      allStocks: [],
      stocks: [],
      portfolioTotal: 0,
      sortBy: 'Alphabetical'
    };
    this.getStocks = this.getStocks.bind(this);
    this.setStocks = this.setStocks.bind(this);
    this.getAllStocks = this.getAllStocks.bind(this);
    this.setAllStocks = this.setAllStocks.bind(this);
    this.removeCheckedBoxes = this.removeCheckedBoxes.bind(this);
    this.updateAllStockPrices = this.updateAllStockPrices.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.removeStock = this.removeStock.bind(this);
  }
  componentDidMount() {
    // get all stocks for this user
    this.getStocks(this.state.sortBy);
    this.getAllStocks();

    //will update the stock prices every 10 seconds
    setInterval(this.updateAllStockPrices, 10000);
  }

  //gets all the stocks for the user stored in the database and puts them in state
  getStocks(sort) {
    sort = sort || this.state.sortBy;
    axios
      .get('/api/stock', { params: { sort: sort } })
      .then(({ data }) => {
        this.setStocks(data);
      })
      .then(() => {
        this.calculateTotal();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //gets all stocks from ticker
  getAllStocks() {
    axios.get(`/api/allStocks/`)
    .then((data) => {
      this.setAllStocks(data);
    })
    .catch(err => console.log(err));
  }

  setStocks(stocks) {
    this.setState({
      stocks: stocks
    });
  }

  setAllStocks(allStocks) {
    let options = [];
    allStocks.data.map(stock => {
      options.push({ value: stock.symbol, label: stock.name })
    })
    this.setState({
      allStocks: options
    })
  }
  // Removes selected stocks from the database and will re-render the view
  removeCheckedBoxes(evt) {
    evt.preventDefault();
    const stockList = [];
    const checkedStocks = document.getElementsByClassName('checkedStock');
    for (var i = 0; i < checkedStocks.length; i++) {
      var stock = checkedStocks[i];

      if (stock.checked) {
        stockList.push(stock.value);
      }
    }

    axios
      .delete('/api/deleteStock', { data: {stocks: stockList }})
      .then(() => {
        this.getStocks();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Removes selected stocks from the database and will re-render the view
  removeStock(stock) {
    axios
      .delete('/api/deleteStock', { data: {stocks: stock.stock_ticker }})
      .then(() => {
        this.getStocks();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //queries the server to get most recent stock prices and then updates the database with the recent stock prices
  //once database is updated, grabs all of the prices and stock tickers and rerenders the screen
  updateAllStockPrices() {
    Promise.all(
      this.state.stocks.map(({ stock_ticker }) => {
        return axios
          .get('/api/currentStockPrice', { params: { STOCK: stock_ticker } })
          .then(({ data }) => {
            return axios.post('/api/currentStockPrice', {
              ticker: stock_ticker,
              price: data
            });
          })
          .catch((err) => console.log(err));
      })
    )
    .then(this.getStocks);
  }

  updateSort(criteria) {
    this.setState({
      sortBy: criteria
    });
    this.getStocks(criteria);
  }

  //calculates grand total value for list of stocks
  calculateTotal() {
    const total = this.state.stocks
      .map((stock) => {
        return stock.quantity * stock.price;
      })
      .reduce((total, subtotal) => {
        return total + subtotal;
      }, 0);
    this.setState({ portfolioTotal: total });
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  renderView (){
    const {view} = this.state;

    if(view === 'home') {
      return ( 
          <div className="columns">
            <div className="column border">
              <AddStock getStocks={this.getStocks} allStocks={this.state.allStocks}/>
              <SortBy updateSort={this.updateSort} />
              <ListOfStocks
                stocksArray={this.state.stocks}
                removeCheckedBoxes={this.removeCheckedBoxes}
                calculateTotal={this.calculateTotal}
                portfolioTotal={this.state.portfolioTotal}
                getStocks={this.getStocks}
              />
            </div>
            <div className="column is-two-thirds border">
              <PortfolioPChart stocks={this.state.stocks} />
            </div>
          </div>
      )
    } else if (view === 'research') {
      return (
        <Research stocks={this.state.stocks} getStocks={this.getStocks} removeStock={this.removeStock} allStocks={this.state.allStocks}  />      
    )
    } else if (view === 'signin'){
      return <SignIn changeView={this.changeView} />
    }

  }

  render() {
    // proceed as usual after initial componentDidMount
    return (
      <div className="container-span">
        <header className="navbar logo">
          <h1>Maverick</h1>
          {this.state.view !== 'signin' && 
          <div className="navbar-end signout">
            <a onClick={() => this.changeView('signin')}>Sign Out</a>
          </div>
          }
        </header>
        {this.state.view !== 'signin' &&
            <div className="tabs">
              <ul>
                <li className={this.state.view === 'home' ? 'is-active' : ''}>
                  <a onClick={() => this.changeView('home')}>Portfolio View</a>
                </li>
                <li className={this.state.view === 'research' ? 'is-active' : ''}>
                  <a onClick={() => this.changeView('research')}>Research</a>
                </li>
              </ul>
            </div>
        }
        <div className="container">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
