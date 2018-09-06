import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddStock from './components/AddStock.jsx';
import ListOfStocks from './components/ListOfStocks.jsx';
import StockChart from './components/StockChart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      currentStock: {}
    };
    this.getStocks = this.getStocks.bind(this);
    this.setStocks = this.setStocks.bind(this);
    this.displayStock = this.displayStock.bind(this);
    this.removeCheckedBoxes = this.removeCheckedBoxes.bind(this);
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

  removeCheckedBoxes(evt) {
    evt.preventDefault();
    const updateQuantity = [];
    const checkedStocks = document.getElementsByClassName('checkedStock');
    for (var i = 0; i < checkedStocks.length; i++) {
      var stock = checkedStocks[i];

      if (stock.checked) {
        console.log('THIS STOCK WILL BE UPDATED', stock.value);
        updateQuantity.push(stock.value);
      }
    }

    console.log('THESE ARE CHECKED BOXES: ', updateQuantity);

    axios.put('/api/resetQuantity', {stocks:updateQuantity})
    // .then(() => {console.log('GOT THE RESPONSE')})
    
  }

  render() {
    // to prevent refError upon initial render
    // proceed as usual after initial componentDidMount
    return (
      <div className="app">
        <header className="navbar">
          <h1>Stock Portfolio</h1>
        </header>
        <div className="main">
          <AddStock getStocks={this.getStocks} />
          {/* Bypassing initial undefined error */}
          {this.state.currentStock.metaData === undefined ? null : (
            <StockChart currentStock={this.state.currentStock} />
          )}
          <ListOfStocks
            stocksArray={this.state.stocks}
            displayStock={this.displayStock}
            removeCheckedBoxes={this.removeCheckedBoxes}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
