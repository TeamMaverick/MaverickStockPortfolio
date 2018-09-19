import React from 'react';
import Axios from 'axios';

class StockListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.stock.quantity
    });
  }

  // Event handler for changing quantity based on user input
  handleInputChange(evt) {
    const newQuantity = Number(evt.target.value);
    this.callUpdateQuantity(newQuantity);
  }

  callUpdateQuantity(newQuantity) {
    //save to db
    Axios.post('/api/updateQuantity', {
      param: {
        quantity: newQuantity,
        stock: this.props.stock.stock_ticker
      }
    })
      .then((response) => {
        //update state
        this.setState({
          quantity: newQuantity
        });
        this.props.getStocks();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <span className="exporter icon has-text-danger" 
                onClick={(evt) => {this.props.removeStock(evt, this.props.stock)}}>
                <i className="fas fa-lg fa-trash"></i>
              </span>
            </div>
            <div className="level-item">
              <p>
                  {this.props.stock.stock_ticker.toUpperCase()} <br/>{this.props.stock.company_name}{' '}
              </p>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item has-text-centered">
              <p>
                <input
                  className="stockInput"
                  onChange={this.handleInputChange}
                  type="number"
                  value={this.state.quantity}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p>{`Price : $${Number.parseFloat(this.props.stock.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</p>
            </div>
          </div>
          <div className="level-right">
            <p>
              {`Total : $${Number.parseFloat(
                this.props.stock.price * this.props.stock.quantity
              ).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}{' '}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StockListItem;
