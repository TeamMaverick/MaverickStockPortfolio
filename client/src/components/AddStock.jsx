import React from 'react';

class AddStock extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stock : ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick(evt){
    console.log(this.state.stock);
  }

  handleInputChange(evt){
    this.setState({
      stock : evt.target.value
    })
  }

  render(){
    return (
      <div className="addStock">
        <input type="text" onChange={this.handleInputChange} value={this.state.stock} />
        <button onClick={this.handleClick}>Add Stock</button>
      </div>
    )
  }
}

export default AddStock;