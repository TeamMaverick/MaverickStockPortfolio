import React from 'react';
import axios from 'axios';

class AddStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: '',
      quantity: '',
      valid: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleQuantChange = this.handleQuantChange.bind(this);
  }
  // handle Add button click event
  handleClick() {
    // call this within call to get stock api
    axios
      .get('/api/currentStockPrice', { params: { STOCK: this.state.stock } })
      .then(({ data }) => {
        return axios.post('/api/stock', {
          stock: this.state.stock,
          quantity: this.state.quantity,
          price: data,
          uid: firebase.auth().currentUser.uid
        });
      })
      .then(() => {
        //on success - refresh stock list
        this.setState({
          stock: '',
          quantity: ''
        })
        this.props.getStocks();
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          valid : false
        })
      });
  }
  // handle input onchange event (update stock state)
  handleInputChange(evt) {
    this.setState({
      stock: evt.target.value,
      valid : true
    });
  }
  // handle input onchange event (update quantity state)
  handleQuantChange(evt) {
    this.setState({
      quantity: evt.target.value
    });
  }
  render() {
    return (
      <div>
        <div className="field">
          <label className="label">Quantity</label>
          <div className="control">
            <input type="number" onChange={this.handleQuantChange} value={this.state.quantity} />
          </div>
        </div>

        <div className="field">
          <label className="label">Stock</label>
          <div className="control">
            <input className={this.state.valid
              ? 'input'
              : 'input is-danger'} type="text" onChange={this.handleInputChange} value={this.state.stock} />
          </div>
        </div>
        <div className="control">
          <a className="button is-info" onClick={this.handleClick}>
            Add Stock
          </a>
        </div>
      </div>
    );
  }
}

export default AddStock;
