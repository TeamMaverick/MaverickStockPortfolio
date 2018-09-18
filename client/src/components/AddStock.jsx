import React from "react";
import axios from "axios";
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
// import "../../../node_modules/react-select/dist/react-select.css";
// import "../../../node_modules/react-virtualized/styles.css";
// import "../../../node_modules/react-virtualized-select/styles.css";

class AddStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: "",
      valid: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  // handle Add button click event
  handleClick() {
    // call this within call to get stock api
    axios
      .get("/api/currentStockPrice", { params: { STOCK: this.state.stock } })
      .then(({ data }) => {
        return axios.post("/api/stock", {
          stock: this.state.stock,
          quantity: 1,
          price: data
        });
      })
      .then(() => {
        //on success - refresh stock list
        this.props.getStocks();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          valid: false
        });
      });
  }
  // handle input onchange event (update stock state)
  handleInputChange(evt) {
    this.setState({
      stock: evt.value,
      valid: true
    });
  }

  render() {
    return (
      <div className="field has-addons">
        <div className="control is-expanded">
          <Select
            type="text"
            onChange={this.handleInputChange}
            value={this.state.stock}
            options={this.props.allStocks}
            clearable={true}
          />
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
