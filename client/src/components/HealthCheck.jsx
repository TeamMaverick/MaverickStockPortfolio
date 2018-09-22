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
          {this.props.apiWait ? (<div className="apiWait">
            <i className="fas fa-pause"></i> 
            Please wait.. API only can we called few times..</div>) : ''}
          {this.props.currentStock.quote ? (
            <StockChart currentStock={this.props.currentStock} />
          ): (<img src="https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif" 
              style={{marginLeft: '30%', marginTop: '5%'}}></img>
            ) }
        </div>
      </div>
    );
  }
}

export default HealthCheck;
