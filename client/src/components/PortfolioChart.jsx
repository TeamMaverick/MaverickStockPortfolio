import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

var PortfolioChart = ({portfolioHistory, option}) => {
  var ticker = option === 'unrealizedGL' ? 'Unrealized Gain/Loss' : option === 'realizedGL' ? 'Realized Gain/Loss' : 'Value of Holdings'
  console.log(option)
  var lineData = portfolioHistory[option] && calcLine(portfolioHistory[option], portfolioHistory.time)
  var options = {
    // use data from currentStock
    chart: {
      height: 600
    },
    title: {
      text: `${ticker}`
    },
    subtitle: {
      text: 'Using ordinal X axis'
    },
    xAxis: {
      gapGridLineWidth: 0
    },
    rangeSelector: {
      buttons: [
      ],
      selected: 1,
      inputEnabled: false
    },
    series: [
      {
        name: `${ticker}`,
        type: 'area',
        // this will be what Milton passes in
        data: lineData,
        gapSize: 5,
        tooltip: {
          valueDecimals: 2
        },
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.Color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get('rgba')
            ]
          ]
        },
        threshold: null
      }
    ]
  };

  return (
    <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
  );
};

var calcLine = function(selection, time) {
  return time.map((time, i) => {
    return [moment(time).format('x'), selection[i]]
  })
}

export default PortfolioChart;
