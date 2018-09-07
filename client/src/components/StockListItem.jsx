import React from 'react';

class StockListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quantity : 0
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount (){
    this.setState({
      quantity : this.props.stock.quantity
    })
  }
  handleInputChange(){
    console.log('hello')
  }
  render(){
    return (
      <div className="level">
      <div class="level-left">
        <div className="level-item">
            <p><input className="checkedStock checkbox" value={this.props.stock.ticker} type="checkbox" /></p>
        </div>
        <div className="level-item has-text-centered">
            <p><a onClick={() => displayStock(this.props.stock.ticker)}>{this.props.stock.ticker} </a></p>
        </div>
        </div>
        <div class="level-right">
        <div className="level-item has-text-centered">
            <p><input onchange={this.handleInputChange} value={this.state.quantity} /></p>
        </div>
        </div>
      </div>
    );
  }
}

// //individual item in the list of saved stocks
// var StockListItem = function({ stock, displayStock }) {
//   //displayStock here is the clickhandler function defined in the app that makes a get request
//   //to get the data for that particular stock and deposits it in the app's state
  
//           {/* <div>
//           {`$ : ${stock.price} : ${stock.price * stock.quantity}`}
//         </div> */}
// };

export default StockListItem;
