import React from 'react';
import Axios from 'axios';

class StockListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleDeleteQuantity = this.handleDeleteQuantity.bind(this);
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.stock.quantity
    });
  }
  handleInputChange(evt) {
    const newQuantity = Number(evt.target.value);
    this.callUpdateQuantity(newQuantity);
  }

  callUpdateQuantity(newQuantity) {
    //save to db
    Axios.post('/api/updateQuantity', {
      param: {
        quantity: newQuantity,
        stock: this.props.stock.ticker
      }
    })
      .then((response) => {
        //update state
        console.log(response);
        this.setState({
          quantity: newQuantity
        });
        this.props.getStocks();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleAddQuantity(evt) {
    evt.preventDefault();
    const newQuantity = ++this.state.quantity;
    this.callUpdateQuantity(newQuantity);
  }
  handleDeleteQuantity(evt) {
    evt.preventDefault();
    const newQuantity = this.state.quantity > 0 ? --this.state.quantity : 0;
    this.callUpdateQuantity(newQuantity);
  }

  render() {
    return (
      <React.Fragment>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p>
                <input
                  className="checkedStock checkbox"
                  value={this.props.stock.ticker}
                  type="checkbox"
                />
              </p>
            </div>
            <div className="level-item has-text-centered">
              <p>
                <a>
                  {this.props.stock.ticker} {this.props.stock.companyName}{' '}
                </a>
              </p>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item has-text-centered">
              <p>
                <input
                  className="stockInput"
                  onChange={this.handleInputChange}
                  value={this.state.quantity}
                />
                <a onClick={this.handleAddQuantity}>
                  <i className="fas fa-plus" />
                </a>
                &nbsp;
                <a onClick={this.handleDeleteQuantity}>
                  <i className="fas fa-minus" />
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p>{`Price : $ ${Number.parseFloat(this.props.stock.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</p>
            </div>
          </div>
          <div className="level-right">
            <p>
              {`Total : $ ${Number.parseFloat(
                this.props.stock.price * this.props.stock.quantity
              ).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}{' '}
            </p>
          </div>
        </div>
      </React.Fragment>
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
