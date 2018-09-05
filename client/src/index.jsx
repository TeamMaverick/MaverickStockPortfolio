import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddStock from './components/AddStock.jsx';
import StockChart from './components/StockChart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    };
    this.getStocks = this.getStocks.bind(this);
    this.setStocks = this.setStocks.bind(this);
  }
  componentDidMount() {
    this.getStocks();
  }
  getStocks() {
    axios
      .get('stocks')
      .then(({ data }) => {
        console.log(data);
        setStocks(data);
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
  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Stock Portfolio</h1>
        </header>
        <div className="main">
          <AddStock getStocks={this.getStocks} />
          <StockChart />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
