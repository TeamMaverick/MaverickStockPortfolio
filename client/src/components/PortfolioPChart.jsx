import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

var PortfolioPChart = ({ stocks }) => {
  var options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Stock Portfolio Percentages'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [
      {
        name: 'Stocks',
        colorByPoint: true,
        // currently portfolioTotal not working, seems like charts auto calculates
        data: stocks.map((stock) => ({
          name: stock.ticker,
          y: stock.price * stock.quantity
        }))
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={options} />;
};

export default PortfolioPChart;
