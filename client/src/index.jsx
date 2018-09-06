import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddStock from './components/AddStock.jsx';
import ListOfStocks from './components/ListOfStocks.jsx';
import StockChart from './components/StockChart.jsx';
import HealthCheck from './components/HealthCheck.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      currentStock: {},
      tab : 'Home',
      homeTab : true,
      healthCheckTab : false
    };
    this.getStocks = this.getStocks.bind(this);
    this.setStocks = this.setStocks.bind(this);
    this.displayStock = this.displayStock.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
    this.setTab = this.setTab.bind(this);
  }
  componentDidMount() {
    // get all stocks for this user
    this.getStocks();
    // update this to display first stock in database?
    this.displayStock('MSFT');
  }

  //gets all the stocks for the user stored in the database
  getStocks() {
    axios
      .get('/api/stock')
      .then(({ data }) => {
        this.setStocks(data);
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
    this.setTab(e.target.name)
  }
  setTab(tabName){
    this.setState({
      homeTab : false,
      healthCheckTab : false,
    });
    this.setState({
      [tabName] : true
    });
  }

  render() {
    // to prevent refError upon initial render
    if (this.state.currentStock.metaData === undefined) {
      return null;
    } else {
      // proceed as usual after initial componentDidMount
      return (
        <div className="container">
          <header className="navbar">
            <h1>Stock Portfolio</h1>
          </header>
          <div className="tabs">
              <ul onClick={this.handleTabClick}>
                <li className={this.state.homeTab ? "is-active" : "" }><a name="homeTab">Home</a></li>
                <li className={this.state.healthCheckTab ? "is-active" : "" }><a name="healthCheckTab">Health Check</a></li>
              </ul>
            </div>
          <div className="main">
            { this.state.homeTab ? 
              <React.Fragment>
              <AddStock getStocks={this.getStocks} />
              <StockChart currentStock={this.state.currentStock} />
              <ListOfStocks stocksArray={this.state.stocks} displayStock={this.displayStock} />
              </React.Fragment>
              :
              <HealthCheck stocks={this.state.stocks}></HealthCheck>
            }
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
