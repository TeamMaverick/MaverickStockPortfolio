import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddStock from './components/AddStock.jsx';
import ListOfStocks from './components/ListOfStocks.jsx';
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
      sortBy: 'Alphabetical'
    };
    this.getStocks = this.getStocks.bind(this);
    this.setStocks = this.setStocks.bind(this);
    this.removeCheckedBoxes = this.removeCheckedBoxes.bind(this);
    this.updateAllStockPrices = this.updateAllStockPrices.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.convertArrayOfObjectsToCSV = this.convertArrayOfObjectsToCSV.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
    this.downloadPDF = this.downloadPDF.bind(this);
  }
  componentDidMount() {
    // get all stocks for this user
    this.getStocks(this.state.sortBy);

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

  setStocks(stocks) {
    this.setState({
      stocks: stocks
    });
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

  //Convert into CSV this.state.stocks
  convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;
    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }
    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';
    keys = Object.keys(data[0]);
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });
    return result;
  }
  // Download CSV this.state.stocks
  downloadCSV(args) {
    var data, filename, link;
    var csv = this.convertArrayOfObjectsToCSV({
        data: this.state.stocks
    });
    if (csv == null) return;
    filename = args.filename || 'export.csv';
    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);
    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }
  // Download PDF this.state.stocks
  downloadPDF() {
    var doc = new jsPDF('landscape');
    doc.setFontSize(12);
    doc.setFontType("bold");
    doc.text(20, 20, 'id | stock_ticker | company_name | quantity | price | createdAt | updatedAt');
    doc.setFontType("normal");
    let yLocation = 20;
    for (let i=0; i<this.state.stocks.length; i++) {
      var text = '';
      for (var key in this.state.stocks[i]) {
        text = text + ' | ' + this.state.stocks[i][key];
      }
      doc.text(20, yLocation+=10, text);
    }
    // Output as Data URI
    doc.save('Test.pdf');
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
              <AddStock getStocks={this.getStocks} />
              <SortBy updateSort={this.updateSort} />
              <ListOfStocks
                stocksArray={this.state.stocks}
                removeCheckedBoxes={this.removeCheckedBoxes}
                calculateTotal={this.calculateTotal}
                portfolioTotal={this.state.portfolioTotal}
                getStocks={this.getStocks}
                downloadCSV={this.downloadCSV}
                downloadPDF={this.downloadPDF}
              />
            </div>
            <div className="column is-two-thirds border">
              <PortfolioPChart stocks={this.state.stocks} />
            </div>
          </div>
      )
    } else if (view === 'healthcheck') {
      return (
        <HealthCheck stocks={this.state.stocks}  />      
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
                  <a onClick={() => this.changeView('home')}>Home</a>
                </li>
                <li className={this.state.view === 'healthcheck' ? 'is-active' : ''}>
                  <a onClick={() => this.changeView('healthcheck')}>Health Check</a>
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
