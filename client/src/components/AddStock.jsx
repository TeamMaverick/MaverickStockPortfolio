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
    if (evt.target.value == '-') {
      this.setState({
        quantity: ''
      })
    }
    this.setState({
      quantity: evt.target.value
    });
  }
  render() {
    return (
      <div>
        <h3 style={{textAlign: 'center', textDecoration: 'underline', marginBottom: '15px'}}>
          Stock Portfolio
        </h3>
        <form className="field is-horizontal" style={{paddingLeft: '13%'}}>
          <div className="field">
            <p className="control">
              <input className={
                this.state.valid
                ? 'input'
                : 'input is-danger'} 
                type="text" 
                onChange={this.handleInputChange} 
                value={this.state.stock} 
                placeholder="ticker"
              />
            </p>
          </div>
          <div className="field" style={{marginLeft: '15px', marginRight: '15px'}}>
            <p className="control">
              <input
                className="input"
                type="number" 
                min="0" 
                onChange={this.handleQuantChange} 
                value={this.state.quantity} 
                placeholder="quantity"
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
                <button className="button is-info" 
                  onClick={
                    (e) => {
                    e.preventDefault();
                    this.handleClick();
                  }}>
                  Add Stock
                </button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default AddStock;
