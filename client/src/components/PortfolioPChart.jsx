import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

var pieColors = (function () {
  var colors = [],
      base = "#003366",
      i;
  for (i = 0; i < 10; i += 1) {
      // Start out with a darkened base color (negative brighten), and end
      // up with a much brighter color
      colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
  }
  return colors;
}());

var PortfolioPChart = ({ stocks }) => {
  var options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      height: 450
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
        colors: pieColors,
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
            distance: -50,
            filter: {
                property: 'percentage',
                operator: '>',
                value: 4
            },
            style:{
              textOutline: '1px #383838'
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
          name: stock.stock_ticker.toUpperCase(),
          y: stock.price * stock.quantity
        }))
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={options} />;
};

export default PortfolioPChart;
