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
        <div className="column"> 
          <div className="box has-text-centered">
            Chosen Stock (%Change Day, %Change Year, Volume)
          </div>
          {this.props.apiWait ? (<div className="apiWait">
            <i className="fas fa-pause"></i> 
            Please wait.. API only can we called few times..</div>) : ''}
          {this.props.currentStock.quote ? (
            <StockChart currentStock={this.props.currentStock} />
          ): null}
        </div>
      </div>
    );
  }
}

export default HealthCheck;
