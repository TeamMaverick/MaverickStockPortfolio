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
        <tr className="container" role="alert" 
          onClick={() => {
            this.props.displayStock(this.props.stock.stock_ticker)
          }}>
          <td>              
            <span className="exporter icon has-text-danger" 
              onClick={(evt) => {
                this.props.removeStock(evt, this.props.stock)}}>
              <i className="fas fa-trash"></i>
            </span>
          </td>
          <td>{this.props.stock.stock_ticker.toUpperCase()}</td>
          <td>{this.props.stock.company_name}</td>
          <td>                
            <input
              onClick={(e) => e.stopPropagation()}
              className="stockInput"
              onChange={this.handleInputChange}
              type="number"
              value={this.state.quantity}
            />
          </td>
          <td>
            {`${Number.parseFloat(this.props.stock.price)
              .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
          </td>
          <td style={{color: this.props.stock.price * this.props.stock.change >= 0 ? "green" : "red"}}>
            {`${Number.parseFloat(this.props.stock.quantity * this.props.stock.change)
              .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
          </td>
          <td>
            {`${Number.parseFloat(
              this.props.stock.price * this.props.stock.quantity)
                .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}{' '}
          </td>
          {/* <td style={{color: this.props.stock.portfolioReturn >= 0 ? "green" : "red"}}>
            {`${Number.parseFloat(this.props.stock.portfolioReturn)
              .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
          </td> */}
        </tr>
      </React.Fragment>
    );
  }
}

export default StockListItem;
