import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

var StockChart = ({ currentStock }) => {
  var ticker = currentStock.metaData['2. Symbol'];
  var options = {
    // use data from currentStock
    chart: {
      height: 350
    },
    title: {
      text: `${ticker} intraday stock price`
    },
    subtitle: {
      text: 'Using ordinal X axis'
    },
    xAxis: {
      gapGridLineWidth: 0
    },
    rangeSelector: {
      buttons: [
        {
          type: 'hour',
          count: 1,
          text: '1h'
        },
        {
          type: 'day',
          count: 1,
          text: '1D'
        },
        {
          type: 'all',
          count: 1,
          text: 'All'
        }
      ],
      selected: 1,
      inputEnabled: false
    },
    series: [
      {
        name: `${ticker}`,
        type: 'area',
        // this will be what Milton passes in
        data: currentStock.data,
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

export default StockChart;
