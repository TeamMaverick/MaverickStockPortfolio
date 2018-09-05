import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddStock from './components/AddStock.jsx'
import ListOfStocks from './components/ListOfStocks.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      stocks : [],
      currentStock : {}
    };
    this.getStocks = this.getStocks.bind(this);
    this.setStocks = this.setStocks.bind(this);
    this.displayStock = this.displayStock.bind(this);
  }
  componentDidMount(){
    this.getStocks();
  }

  //gets all the stocks for the user stored in the database
  getStocks(){
    axios.get('/stocks/stocks')
      .then(({data}) => {
        console.log('here',data);
        this.setStocks(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  setStocks (stocks) {
    this.setState({
      stocks : stocks
    })
  }
  
  //called when a ticker symbol on the stocks list is clicked
  //requests the data for that ticker symbol and deposits it in the state
  displayStock(stock) {
    return axios.get('/stocks/stockInfo', { params: { STOCK : stock}})
    .then(({data}) => {
      console.log(data)
      this.setState({currentStock : data})
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  render() {
  	return (
      <div className="app">
        <header className="navbar"><h1>Stock Portfolio</h1></header> 
        <div className="main">
          <AddStock getStocks={this.getStocks} />
          <ListOfStocks stocksArray={this.state.stocks} displayStock={this.displayStock}/>
        </div>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
