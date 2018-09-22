import React from "react";
import axios from "axios";
import Select from 'react-autocomplete';

class AddStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: "",
      options: [],
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
          userId: this.props.user.uid,
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
      stock: evt.target.value,
      valid: true
    });

    axios.get("/api/allStocks", { params: {stock: evt.target.value} })
    .then(({data}) => {
      console.log(data);
      this.setState({
        options: data
      })
    })
  }

  render() {
    return (
      <div className="field has-addons">
        <div className="control is-expanded">
          <Select
            items={this.state.options}
            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={(item) => item.label}
            renderItem={(item, isHighlighted) =>
              <a><div                
              key={item.id}
              style={{ background: isHighlighted ? '#ffffe6' : 'white',
                       fontSize: isHighlighted ? '16px' : '15px',
              }}>
                {item.label}
              </div>
              </a>
            }
            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
            value={this.state.stock}
            onChange={this.handleInputChange}
            onSelect={value => this.setState({ stock : (value.substring(0, value.indexOf(':'))) })}
            inputProps={{className:'input', placeholder:'Search...'}}
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