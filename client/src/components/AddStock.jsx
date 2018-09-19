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
      quantity: Math.abs(evt.target.value)
    });
  }
  render() {
    return (
      <div className="columns">
        <div className="column is-6" style={{marginTop: '15px'}}> 
          <h3>
            Stock Portfolio
            <span className="exporter icon is-large has-text-danger" onClick={this.props.downloadPDF}>
              <i className="fas fa-lg fa-file-pdf"></i>
            </span>
            <span className="exporter icon is-large has-text-success" onClick={this.props.downloadCSV}>
              <i className="fas fa-lg fa-file-excel"></i>
            </span>
          </h3>

        </div>
        <div className="column">
          <form>
            <div className="field is-horizontal">
              <label className="label">
                Quantity
              </label>
              <input 
                className="input"
                type="number" 
                min="0" 
                onChange={this.handleQuantChange} 
                value={this.state.quantity} 
                style={{marginRight: '15px'}}
              />
              <label className="label">Ticker</label>            
              <input className={
                this.state.valid
                ? 'input'
                : 'input is-danger'} 
                type="text" 
                onChange={this.handleInputChange} 
                value={this.state.stock} 
                style={{marginRight: '15px'}}
              />
          </div>
          <div style={{textAlign: 'right'}}>
            <button className="button is-info" 
              onClick={
                (e) => {
                e.preventDefault();
                this.handleClick();
              }}>
              Add Stock
            </button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default AddStock;
