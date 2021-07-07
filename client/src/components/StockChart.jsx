import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

var StockChart = ({ currentStock }) => {
  var ticker = currentStock.quote.symbol;
  var options = {
    // use data from currentStock
    chart: {
      height: 400
    },
    title: {
      text: `${ticker} Stock Price for the Year`
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
          type: 'month',
          count: 1,
          text: '1m',
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        }, {
          type: 'month',
          count: 6,
          text: '6m'
        }, {
          type: 'ytd',
          text: 'YTD'
        }, {
          type: 'all',
          text: 'All'
        }
      ],
      selected: 0,
      inputEnabled: false
    },
    series: [
      {
        name: `${ticker.toUpperCase()}`,
        type: 'area',
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
