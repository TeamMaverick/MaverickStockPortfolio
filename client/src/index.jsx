import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import AddStock from './components/AddStock.jsx';
import ListOfStocks from './components/ListOfStocks.jsx';
import HealthCheck from './components/HealthCheck.jsx';
import PortfolioPChart from './components/PortfolioPChart.jsx';
import SignIn from './components/SignIn.jsx';
import StockDetails from './components/StockDetails.jsx';
import Infinite from './components/Infinite.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view : 'signin',
      stocks: [],
      portfolioTotal: 0,
      todaysChange: 0,
      authenticated: false,
      user: {},
      currentStock: {},
      sortBy: 'stock_ticker',
      peersQuotes: {},
      peersUpdated: false,
      portfolioReturn: 0
    };
    this.getStocks = this.getStocks.bind(this);
    this.getStocksInitial = this.getStocksInitial.bind(this);
    this.getPeersChange = this.getPeersChange.bind(this);
    this.setStocks = this.setStocks.bind(this);
    this.removeStock = this.removeStock.bind(this);
    this.updateAllStockPrices = this.updateAllStockPrices.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.calculateTodaysChange = this.calculateTodaysChange.bind(this);   
    this.calculateReturnsChange = this.calculateReturnsChange.bind(this);    
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.createUser = this.createUser.bind(this);
    this.signInUser = this.signInUser.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
    this.convertArrayOfObjectsToCSV = this.convertArrayOfObjectsToCSV.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
    this.downloadPDF = this.downloadPDF.bind(this);
    this.changeSort = this.changeSort.bind(this);
    
    //taken from HealthCheck
    this.displayStock = this.displayStock.bind(this);
  }
  componentDidMount() {
    //if user logged in or logged out
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { 
        this.setState({ authenticated: true, user, view: 'home' }, 
        () => {
          this.getStocksInitial(null, this.state.user.uid);
        }
      )
    } else {
        this.setState({ authenticated: false, user: null , view: 'signin' })
      }
    });
    
    //will update the stock prices every 10 seconds
    // setInterval(this.updateAllStockPrices, 60000);
  }
  
  createUser(email, password, firstname, lastname) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: firstname + ' ' + lastname
      })
      .then(() => console.log('updated displayname'))
      .catch((err) => console.error(err))
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('error code:',errorCode, 'with message: ', errorMessage)
    });
  }
  
  signInUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('error code:',errorCode, 'with message: ', errorMessage)
      window.alert('incorrect username/password')
    });
  }
  
  signOutUser() {
    firebase.auth().signOut()
  }
  
  getStocksInitial(sort, uid) {
    //gets all the stocks for the user stored in the database and puts them in state
    sort = sort || this.state.sortBy;
    uid = uid || this.state.user.uid;
    axios
    .get('/api/stock', { params: { sort: sort, uid: uid, direction:true } })
    .then(({ data }) => {
      this.setStocks(data);
    })
    .then(() => {
      this.calculateTotal();
      this.calculateTodaysChange();
      this.calculateReturnsChange();
    })
    .then(() => {
      if (this.state.stocks.length > 0) this.displayStock(this.state.stocks[0].stock_ticker);
      else this.setState({currentStock: {}})
    })
    .catch((err) => {
      console.log(err);
    });
  }

  changeSort(sort) {
    this.setState({
      sortBy: sort
    });
  }

  //gets all the stocks for the user stored in the database and puts them in state
  getStocks(sort, uid, direction) {
    sort = sort || this.state.sortBy;
    uid = uid || this.state.user.uid;
    direction = direction || null;
    axios
    .get('/api/stock', { params: { sort: sort, uid: uid, direction: direction } })
    .then(({ data }) => {
      this.setStocks(data);
    })
    .then(() => {
      this.calculateTotal();
      this.calculateTodaysChange();
      this.calculateReturnsChange();
    })
    .then(() => {
      if (this.state.stocks.length > 0) this.displayStock(this.state.stocks[0].stock_ticker);
      else this.setState({currentStock: {}})
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  setStocks(stocks) {
    this.setState({ stocks });
  }

  getPeersChange() {
    axios
      .get('/api/peers', {params: { peers: this.state.currentStock.peers }})
      .then((RES) => {
        console.log("PEERSCHANGE",RES);
        this.setState({ peersQuotes: RES });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  // Removes selected stocks from the database and will re-render the view
  removeStock(evt, stock) {
    evt.stopPropagation();
    const stockList = [stock.stock_ticker];
    axios
      .delete('/api/deleteStock', { data: {stocks: stockList, uid: this.state.user.uid }})
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
              price: data.quote.latestPrice,
              change: data.quote.change,
              ytdChange: data.quote.ytdChange,
              latestVolume: data.quote.latestVolume
              //TODO: ADD
            });
          })
          .catch((err) => console.log(err));
      })
    )
    .then(this.getStocks);
  }

  //calculates grand total value for list of stocks
  calculateTotal() {
    const total = this.state.stocks.map((stock) => {
        return stock.quantity * stock.price;
      })
      .reduce((total, subtotal) => {
        return total + subtotal;
      }, 0);
    this.setState({ portfolioTotal: total });
  }

  calculateTodaysChange() {
    const today = this.state.stocks.map((stock) => {
        return stock.quantity * stock.change;
      })
      .reduce((today, subtotal) => {
        return today + subtotal;
      }, 0);
    this.setState({ todaysChange: today });
  }

  calculateReturnsChange() {
    const returns = this.state.stocks.map((stock) => {
        return ((stock.quantity*stock.boughtPrice)-(stock.quantity * stock.price));
      })
      .reduce((today, subtotal) => {
        return today + subtotal;
      }, 0);
    this.setState({ portfolioReturn: returns });
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

  //called when a ticker symbol on the stocks list is clicked
  //requests the data for that ticker symbol and deposits it in the state
  displayStock(stock) {
    console.log(stock);
    return axios
      .get('/api/stockInfo', { params: { STOCK: stock } })
      .then(({data}) => {
        this.setState({ currentStock: data });
      })
      .catch((err) => {
        console.log(err);
      });
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
        <div>
          <div className="columns border">
            <div className="column is-two-thirds" style={{marginBottom: '50px'}}>
              <AddStock 
                getStocks={this.getStocks} 
              />
              <ListOfStocks
                stocksArray={this.state.stocks}
                removeStock={this.removeStock}
                calculateTotal={this.calculateTotal}
                getStocks={this.getStocks}
                displayStock={this.displayStock}
                getSpecificStockInfo={this.getSpecificStockInfo}
                downloadCSV={this.downloadCSV}
                downloadPDF={this.downloadPDF}
                portfolioTotal={this.state.portfolioTotal}
                todaysChange={this.state.todaysChange}
                portfolioReturn={this.state.portfolioReturn}
                changeSort={this.changeSort}
                sortBy={this.state.sortBy}                
              />
            </div>
            <div className="column is-one-third">
              <PortfolioPChart stocks={this.state.stocks} />
            </div>
          </div>
          {/* <div className="columns border" style={{height: '500px'}} >
            <div className="column"> */}
              <HealthCheck 
                currentStock={this.state.currentStock} 
                displayStock={this.displayStock}/>      
            {/* </div> */}
          {/* </div> */}
          <StockDetails 
            currentStock={this.state.currentStock}
            // peersQuotes={this.state.peersQuotes} 
            />    
        </div>
      )
    } else if (view === 'signin'){
      return <SignIn changeView={this.changeView} signInUser={this.signInUser} createUser={this.createUser}/>
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
            <a onClick={this.signOutUser}>Sign Out</a>
          </div>
          }
        </header>
        {this.state.view !== 'signin' &&
            <div className="tabs">
            </div>
        }
        {this.state.authenticated ? <Infinite/> : <div></div>}
        <div className="container">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));