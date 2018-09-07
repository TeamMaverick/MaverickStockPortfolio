import React from 'react';
import Axios from 'axios';

class StockListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quantity : 0
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleDeleteQuantity = this.handleDeleteQuantity.bind(this);
  }

  componentDidMount (){
    this.setState({
      quantity : this.props.stock.quantity
    })
  }
  handleInputChange(evt){
    this.setState({
      quantity : Number(evt.target.value)
    })
  }
  handleAddQuantity(evt){
    evt.preventDefault();
    const newQuantity = ++this.state.quantity
    //save to db
    Axios.post('/api/updateQuantity', {
      param: {
        quantity : newQuantity,
        stock : this.props.stock.ticker
      }
    })
      .then((response) => {
        //update state
        console.log(response);
        this.setState({
          quantity : newQuantity
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  handleDeleteQuantity(evt){
    evt.preventDefault();
    this.setState({
      quantity : this.state.quantity > 0 ? --this.state.quantity : 0
    })
  }

  render(){
    return (
      <div className="level">
      <div className="level-left">
        <div className="level-item">
            <p><input className="checkedStock checkbox" value={this.props.stock.ticker} type="checkbox" /></p>
        </div>
        <div className="level-item has-text-centered">
            <p><a onClick={() => displayStock(this.props.stock.ticker)}>{this.props.stock.ticker} </a></p>
        </div>
        </div>
        <div className="level-right">
        <div className="level-item has-text-centered">
            <p><input onChange={this.handleInputChange} value={this.state.quantity} />
            <a onClick={this.handleAddQuantity}><i className="fas fa-plus"></i></a>&nbsp;
            <a onClick={this.handleDeleteQuantity}><i className="fas fa-minus"></i></a>
            </p>
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
