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
      sortBy: 'Alphabetical',
      authenticated: false,
      user: null
    };
    this.getStocks = this.getStocks.bind(this);
    this.setStocks = this.setStocks.bind(this);
    this.removeCheckedBoxes = this.removeCheckedBoxes.bind(this);
    this.updateAllStockPrices = this.updateAllStockPrices.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.createUser = this.createUser.bind(this);
    this.signInUser = this.signInUser.bind(this);
    this.signOutUser = this.signOutUser.bind(this);

  }
  componentDidMount() {
    //if user logged in or logged out
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { 
        console.log('this is the user data when componentdidmount', user);
        this.setState({ authenticated: true, user, view: 'home' }, () => this.getStocks(this.state.sortBy, this.state.user.uid))
      } else {
        this.setState({ authenticated: false, user: null , view: 'signin' })
      }
    });

    // // get all stocks for this user
    // this.getStocks(this.state.sortBy);

    //will update the stock prices every 10 seconds
    setInterval(this.updateAllStockPrices, 10000);

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

  //gets all the stocks for the user stored in the database and puts them in state
  getStocks(sort, uid) {
    sort = sort || this.state.sortBy;
    uid = uid || this.state.user.uid;
    axios
      .get('/api/stock', { params: { sort: sort, uid: uid } })
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
    this.setState({ stocks });
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
    const total = this.state.stocks.map((stock) => {
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
              <AddStock getStocks={this.getStocks} />
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
    } else if (view === 'healthcheck') {
      return (
        <HealthCheck stocks={this.state.stocks}  />      
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
