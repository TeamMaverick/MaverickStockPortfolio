import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddStock from './components/AddStock.jsx';
import ListOfStocks from './components/ListOfStocks.jsx';
import StockChart from './components/StockChart.jsx';
import HealthCheck from './components/HealthCheck.jsx';
import SortBy from './components/SortBy.jsx';
import PortfolioPChart from './components/PortfolioPChart.jsx';
import SignIn from './components/SignIn.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view : 'signin',
      stocks: [],
      portfolioTotal: 0,
      currentStock: {},
      sortBy: 'Alphabetical'
    };
    this.getStocks = this.getStocks.bind(this);
    this.setStocks = this.setStocks.bind(this);
    this.displayStock = this.displayStock.bind(this);
    this.removeCheckedBoxes = this.removeCheckedBoxes.bind(this);
    this.updateAllStockPrices = this.updateAllStockPrices.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
  }
  componentDidMount() {
    // get all stocks for this user
    this.getStocks(this.state.sortBy);
    // update this to display first stock in database?
    this.displayStock('MSFT');

    //will update the stock prices every 10 seconds
    // setInterval(this.updateAllStockPrices, 10000);
  }

  //gets all the stocks for the user stored in the database
  getStocks(sort) {
    sort = sort || this.state.sortBy;
    axios
      .get('/api/stock', { params: { sort: sort } })
      .then(({ data }) => {
        const stocksList = [];
        data.forEach((stock) => {
          if (stock.quantity > 0) {
            stocksList.push(stock);
          }
        });
        this.setStocks(stocksList);
      })
      .then(() => {
        this.calculateTotal();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setStocks(stocks) {
    this.setState({
      stocks: stocks
    });
  }

  //called when a ticker symbol on the stocks list is clicked
  //requests the data for that ticker symbol and deposits it in the state
  displayStock(stock) {
    return axios
      .get('/api/stockInfo', { params: { STOCK: stock } })
      .then(({ data }) => {
        this.setState({ currentStock: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeCheckedBoxes(evt) {
    evt.preventDefault();
    const updateQuantity = [];
    const checkedStocks = document.getElementsByClassName('checkedStock');
    for (var i = 0; i < checkedStocks.length; i++) {
      var stock = checkedStocks[i];

      if (stock.checked) {
        updateQuantity.push(stock.value);
      }
    }

    axios
      .put('/api/resetQuantity', { stocks: updateQuantity, sort: this.state.sortBy })
      .then(() => {
        console.log('getting new list');
        this.getStocks();
      });
  }

  //queries the server to get most recent stock prices and then updates the database with the recent stock prices
  //once database is updated, grabs all of the prices and stock tickers and rerenders the screen
  updateAllStockPrices() {
    Promise.all(
      this.state.stocks.map(({ ticker, quantity }) => {
        return axios
          .get('/api/currentStockPrice', { params: { STOCK: ticker } })
          .then(({ data }) => {
            console.log('called a promise');
            return axios.post('/api/currentStockPrice', {
              ticker: ticker,
              price: data
            });
          })
          .catch((err) => console.log(err));
      })
    );
  }

  updateSort(criteria) {
    this.setState({
      sortBy: criteria
    });
    this.getStocks(criteria);
  }

  //calculates grand total value for list of stocks
  calculateTotal() {
    console.log(this.state.stocks);
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
        <React.Fragment>
              <div className="columns">
                <div className="column stocks">
                  <AddStock getStocks={this.getStocks} />
                  <SortBy updateSort={this.updateSort} />
                  <ListOfStocks
                    stocksArray={this.state.stocks}
                    displayStock={this.displayStock}
                    removeCheckedBoxes={this.removeCheckedBoxes}
                    calculateTotal={this.calculateTotal}
                    portfolioTotal={this.state.portfolioTotal}
                    getStocks={this.getStocks}
                  />
                </div>
                <div className="column is-two-thirds">
                  <PortfolioPChart stocks={this.state.stocks} />
                </div>
              </div>
            </React.Fragment>
      )
    } else if (view === 'healthcheck') {
      return (
      <div className="columns">
        <div className="column check">
          <HealthCheck stocks={this.state.stocks} displayStock={this.displayStock} />
        </div>
        <div className="column is-two-thirds">
          {this.state.currentStock.metaData === undefined ? null : (
            <StockChart currentStock={this.state.currentStock} />
          )}
        </div>
      </div>
    )
    } else if (view === 'signin'){
      return <SignIn changeView={this.changeView} />
    }

  }

  render() {
    // proceed as usual after initial componentDidMount
    return (
      <div className="container">
        <header className="navbar logo">
          <h1>Stock Portfolio</h1>
        </header>
        {this.state.view !== 'signin' &&
            <div className="tabs">
              <ul>
                <li>
                  <a onClick={() => this.changeView('home')}>Home</a>
                </li>
                <li>
                  <a onClick={() => this.changeView('healthcheck')}>Health Check</a>
                </li>
                <li className="signOut">
                  <a onClick={() => this.changeView('signin')}>Sign Out</a>
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
