import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import AddStock from './components/AddStock.jsx';
import ListOfStocks from './components/ListOfStocks.jsx';
import Research from './components/Research.jsx';
import SortBy from './components/SortBy.jsx';
import PortfolioPChart from './components/PortfolioPChart.jsx'; 
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import MessageBox from './components/MessageBox.jsx'
import Search from './components/Search.jsx';
import CompareList from './components/CompareList.jsx';
import BuySell from './components/BuySell.jsx';

import PortfolioChart from './components/PortfolioChart.jsx';
import firebase from 'firebase'
import config from '../../config.js'

firebase.initializeApp(config)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view : 'signin',
      allStocks: [],
      stocks: [],
      portfolioTotal: 0,
      sortBy: 'Alphabetical',
      portfolio: {},
      portfolioHistory: {},
      paneToggle: 'pie',
      portfolioDataToggle: 'unrealizedGL',
      modalOpen: false,
      stockToBuy: {},
      buyOrSell: '',
      sellLimit: 0,
      user: null
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
    this.getPortfolioHistory = this.getPortfolioHistory.bind(this);
    this.getPortfolioHoldings = this.getPortfolioHoldings.bind(this);
    this.changeToggle = this.changeToggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this)
    this.setGuest = this.setGuest.bind(this)
    this.sum = this.sum.bind(this)
  }
  
  componentDidMount() {
    // get all stocks for this user
    this.getStocks(this.state.sortBy);
    this.getAllStocks();
    this.getPortfolioHoldings();
    this.getPortfolioHistory();
    //will update the stock prices every 10 seconds
    setInterval(this.updateAllStockPrices, 100000);
  }
  
   sum(a, b) {
    return a + b;
  }

  signIn(email, pw) {
    firebase.auth().signInWithEmailAndPassword(email, pw)
    .then(res => {
      axios.get('/api/signin', {
        params: {uid: res.user.uid}
      })
      .then(user => {
        this.setState({ user: user.data, view: 'home' })
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }

  signUp(username, email, pw) {
    firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then(res => {
      axios.post('/api/signup', {
        username, username,
        email: email,
        uid: res.user.uid
      })
      .then(() => this.signIn(email, pw))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
  }

  signOut() {
    firebase.auth().signOut()
    .then(() => {
      this.setState({ user: null, view: 'signin' })
      console.log('signed out')})
    .catch(err => console.log(err));
  }

  setGuest() {
    this.setState({ user: true, view: 'home' })
  }

  getPortfolioHistory() {
    axios.get('/api/portfolio', {
      userId: 1,
      })
      .then(({data}) => {
        this.setState({
          portfolioHistory: data
        })
      })
  }

  getPortfolioHoldings() {
    console.log('Update portfolio');
    axios.get('/api/holdings')
      .then(({data}) => {
        console.log('Got Portfolio')
        this.setState({
          portfolio: data
        })
        this.calculateTotal()
      })
      .catch((err) => {
        console.log(err);
      })
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

  toggleModal(stock, buyOrSell, limit) {
    if (stock === null) {
      this.setState({
        modalOpen: false
      })
    } else {
      axios.get('/api/search', {
        params: { term: stock }
      })
      .then(({data}) => {
        this.setState({
          modalOpen: true,
          stockToBuy: data,
          buyOrSell: buyOrSell,
          sellLimit: limit
        })
      })
      .catch(err => console.log(err))
    }
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
      options.push({ value: stock.symbol, label: stock.name.split(' ').slice(0, 4).join(' ') })
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
    if (Object.keys(this.state.portfolio).length > 0) {
      const total = this.state.portfolio
        .map((stock) => {
          return stock.quantity * stock.price
        })
        .reduce((total, subtotal) => {
          return total + subtotal
        }, 0);
      this.setState({ portfolioTotal: total })
    }
  }

  changeView(option) {
    console.log("Change the view to " + option)
    this.setState({
      view: option
    });
  }

  changeToggle(option) {
    this.setState({
      paneToggle: option
    })
  }

  changeData(option) {
    this.setState({
      portfolioDataToggle: option
    })
  }

  renderView (){
    const {view} = this.state
    let currentToggle

    if (this.state.paneToggle === 'pie') {
      currentToggle = 
      (
        <div className="column is-three-fifths border">
          <div className="buttons has-addons">
            <span className="button" onClick={() => {this.changeToggle('else')}}>Portfolio Returns</span>
            <span className="button is-danger is-selected">Portfolio Composition</span>
          </div>
          <PortfolioPChart stocks={this.state.portfolio} />
        </div>
      )
    } else {

      currentToggle = 
      (
        <div className="column is-three-fifths border">
          <div className="buttons has-addons">
            <span className="button is-danger is-selected">Portfolio Returns</span>
            <span className="button" onClick={() => {this.changeToggle('pie')}}>Portfolio Composition</span>
          </div>
          <div className="buttons has-addons">
            <span 
              className={`button is-small ${this.state.portfolioDataToggle === 'realizedGL' ? 'is-selected is-info': null}`}
              onClick={() => {this.changeData('realizedGL')}}
            >
              Realized Gain/Loss
            </span>
            <span 
              className={`button is-small ${this.state.portfolioDataToggle === 'valueOfHoldings' ? 'is-selected is-info': null}`}
              onClick={() => {this.changeData('valueOfHoldings')}}
            >
              Value of Holdings
            </span>
            <span 
              className={`button is-small ${this.state.portfolioDataToggle === 'unrealizedGL' ? 'is-selected is-info': null}`} 
              onClick={() => {this.changeData('unrealizedGL')}}
            >
              Unrealized Gain/Loss
            </span>
          </div>
          <PortfolioChart portfolioHistory={this.state.portfolioHistory} option={this.state.portfolioDataToggle}/>
        </div>
      )
    }
    
    if(view === 'home') {
      return ( 
        <div>
          <div className="columns">
            <div className="column border">
              {/* <SortBy updateSort={this.updateSort} /> */}
              <ListOfStocks
                stocksArray={this.state.portfolio}
                removeCheckedBoxes={this.removeCheckedBoxes}
                calculateTotal={this.calculateTotal}
                portfolioTotal={this.state.portfolioTotal}
                getStocks={this.getStocks}
                toggleModal={this.toggleModal}
              />
            </div>
            {currentToggle}
          </div>
        </div>
      )
    } else if (view === 'research') {
      return (
        <Research 
          stocks={this.state.stocks} 
          getStocks={this.getStocks} 
          removeStock={this.removeStock} 
          allStocks={this.state.allStocks} 
          toggleModal={this.toggleModal} 
        />      
      )
    } else if (view === 'signin') {
      return <SignIn setGuest={this.setGuest} signIn={this.signIn} changeView={this.changeView} />
    } else if (view === 'signup') {
      return <SignUp signUp={this.signUp} />
    } else if (view === 'chat') {
      return <MessageBox />
    } else if (view === 'search') {
      return <Search changeView={this.changeView} getPortfolioHoldings={this.getPortfolioHoldings} />
    } else if (view === 'compare') {
      return <CompareList changeView={this.changeView} getPortfolioHoldings={this.getPortfolioHoldings} />
    }
  }

  render() {
    {console.log(this.state.view)}
    // proceed as usual after initial componentDidMount
    return (
      <div className="container-span">
        <header className="navbar logo">
          <h1>Maverick</h1>
          {this.state.user !== null && 
          <div className="navbar-end signout">
            <a onClick={() => this.signOut()}>Sign Out</a>
          </div>
          }
        </header>
        {this.state.user !== null &&
            <div className="tabs">
              <ul>
                <li className={this.state.view === 'home' ? 'is-active' : ''}>
                  <a onClick={() => this.changeView('home')}>Portfolio View</a>
                </li>
                <li className={this.state.view === 'research' ? 'is-active' : ''}>
                  <a onClick={() => this.changeView('research')}>Research</a>
                </li>
                <li className={this.state.view === 'search' ? 'is-active' : ''}>
                  <a onClick={() => this.changeView('search')}>Search</a>
                </li>
                <li className={this.state.view === 'chat' ? 'is-active' : ''}>
                  <a onClick={() => this.changeView('chat')}>Customer Service</a>
                </li>
              </ul>
            </div>
        }
        <div className="container">
          {this.renderView()}
        </div>
        <BuySell getPortfolioHoldings={this.getPortfolioHoldings} modalOpen={this.state.modalOpen} toggleModal={this.toggleModal} stock={this.state.stockToBuy} sellLimit={this.state.sellLimit} buyOrSell={this.state.buyOrSell}></BuySell>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
