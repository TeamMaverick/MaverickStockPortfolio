import React from 'react';
import HealthCheckItem from './HealthCheckItem.jsx';

class HealthCheck extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Health Check</h1>
        <div>
          <p>Let's do a quick health check on your {this.props.stocks.length} Stocks</p>
          {this.props.stocks.map((stock, i) => {
            return (<HealthCheckItem key={i} stock={stock}></HealthCheckItem>)
          })}
        </div>
      </div>
    )
  }
}

export default HealthCheck;