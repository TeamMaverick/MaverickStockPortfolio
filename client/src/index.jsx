import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
<<<<<<< HEAD
import AddStock from './components/AddStock.jsx';
import StockChart from './components/StockChart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
=======
import AddStock from './components/AddStock.jsx'
import ListOfStocks from './components/ListOfStocks.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      stocks : [],
      currentStock : {}
>>>>>>> dev
    };
    this.getStocks = this.getStocks.bind(this);
    this.setStocks = this.setStocks.bind(this);
    this.displayStock = this.displayStock.bind(this);
  }
<<<<<<< HEAD
  componentDidMount() {
    this.getStocks();
  }
  getStocks() {
    axios
      .get('stocks')
      .then(({ data }) => {
=======
  componentDidMount(){
    this.getStocks();
  }

  //gets all the stocks for the user stored in the database
  getStocks(){
    axios.get('/stocks')
      .then(({data}) => {
>>>>>>> dev
        console.log(data);
        setStocks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
<<<<<<< HEAD
  setStocks(stocks) {
=======
  
  setStocks (stocks) {
>>>>>>> dev
    this.setState({
      stocks: stocks
    });
  }
<<<<<<< HEAD
  render() {
    return (
=======
  
  //called when a ticker symbol on the stocks list is clicked
  //requests the data for that ticker symbol and deposits it in the state
  displayStock(stock) {
    return axios.get('/stockInfo', { params: { stock: stock}})
    .then((data) => {
      this.setState({currentStock : data})
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  render() {
  	return (
>>>>>>> dev
      <div className="app">
        <header className="navbar">
          <h1>Stock Portfolio</h1>
        </header>
        <div className="main">
          <AddStock getStocks={this.getStocks} />
<<<<<<< HEAD
          <StockChart />
=======
          <ListOfStocks stocksArray={this.state.stocks} displayStock={this.displayStock}/>
>>>>>>> dev
        </div>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
