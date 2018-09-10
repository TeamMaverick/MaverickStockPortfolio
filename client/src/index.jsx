import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddStock from './components/AddStock.jsx';
import ListOfStocks from './components/ListOfStocks.jsx';
import StockChart from './components/StockChart.jsx';
import HealthCheck from './components/HealthCheck.jsx';
import SortBy from './components/SortBy.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      currentStock: {},
      tab: 'Home',
      homeTab: true,
      healthCheckTab: false,
      // apply this to all get list of stock tickers from database
      sortBy: 'Alphabetical'
    };
    this.getStocks = this.getStocks.bind(this);
    this.setStocks = this.setStocks.bind(this);
    this.displayStock = this.displayStock.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.setTab = this.setTab.bind(this);
    this.removeCheckedBoxes = this.removeCheckedBoxes.bind(this);
    this.updateAllStockPrices = this.updateAllStockPrices.bind(this);
    this.updateSort = this.updateSort.bind(this);
  }
  componentDidMount() {
    // get all stocks for this user
    this.getStocks();
    // update this to display first stock in database?
    this.displayStock('MSFT');

    // setInterval(this.updateAllStockPrices, 10000);
  }

  //gets all the stocks for the user stored in the database
  getStocks() {
    axios
      .get('/api/stock')
      .then(({ data }) => {
        const stocksList = [];
        data.forEach((stock) => {
          if (stock.quantity > 0) {
            stocksList.push(stock);
          }
        });
        this.setStocks(stocksList);
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
  handleTabClick(e) {
    this.setTab(e.target.name);
  }
  setTab(tabName) {
    this.setState({
      homeTab: false,
      healthCheckTab: false
    });
    this.setState({
      [tabName]: true
    });
  }

  // Called when remove Checked stocks button is clicked
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

    axios.put('/api/resetQuantity', { stocks: updateQuantity }).then((data) => {
      const stocks = data.data;

      this.setState({
        stocks: stocks
      });
    });
  }

  updateAllStockPrices() {
    Promise.all(
      this.state.stocks.map(({ ticker, quantity }) => {
        return axios
          .get('/api/currentStockPrice', { params: { STOCK: ticker } })
          .then(({ data }) => {
            console.log('called a promise');
            return axios.post('/api/stock', {
              stock: ticker,
              quantity: quantity,
              price: data
            });
          });
      })
    )
      .then(() => {
        console.log('rerendering');
        this.getStocks();
      })
      .catch((err) => console.log(err));
  }

  updateSort(criteria) {
    this.setState({
      sortBy: criteria
    });
  }

  render() {
    // proceed as usual after initial componentDidMount
    return (
      <div className="container">
        <header className="navbar">
          <h1 className="logo">Maverick</h1>
        </header>
        <div className="tabs">
          <ul onClick={this.handleTabClick}>
            <li className={this.state.homeTab ? 'is-active' : ''}>
              <a name="homeTab">Home</a>
            </li>
            <li className={this.state.healthCheckTab ? 'is-active' : ''}>
              <a name="healthCheckTab">Health Check</a>
            </li>
          </ul>
        </div>
        <div className="container">
          {this.state.homeTab ? (
            <React.Fragment>
              <div className="columns">
                <div className="column">
                  <AddStock getStocks={this.getStocks} />
                  <SortBy updateSort={this.updateSort} />
                  <ListOfStocks
                    stocksArray={this.state.stocks}
                    displayStock={this.displayStock}
                    removeCheckedBoxes={this.removeCheckedBoxes}
                  />
                </div>
                <div className="column is-two-thirds">
                  {this.state.currentStock.metaData === undefined ? null : (
                    <StockChart currentStock={this.state.currentStock} />
                  )}
                </div>
              </div>
            </React.Fragment>
          ) : (
            <HealthCheck stocks={this.state.stocks} />
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
