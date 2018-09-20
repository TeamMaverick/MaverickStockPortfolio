import React from 'react';
import Axios from 'axios';
// import HealthCheckItem from './HealthCheckItem.jsx';
import StockChart from './StockChart.jsx';


class HealthCheck extends React.Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   this.props.displayStock('goog')
  // }

  render() {
    return (
      <div className="columns">
        <div className="column"> 
          <div className="box has-text-centered">
            Chosen Stock (%Change Day, %Change Year, Volume)
          </div>
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
