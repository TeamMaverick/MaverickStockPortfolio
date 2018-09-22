import React from 'react';
import Axios from 'axios';
// import HealthCheckItem from './HealthCheckItem.jsx';
import StockChart from './StockChart.jsx';


class HealthCheck extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="columns">
          {this.props.currentStock.quote ? (
            <StockChart currentStock={this.props.currentStock} />
          ): (<img className="spinner" style={{alignContent: 'center'}}/>
            ) }
        </div>
      </div>
    );
  }
}

export default HealthCheck;
