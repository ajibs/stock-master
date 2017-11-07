/**
* Create the chart when all data is loaded
* @returns {undefined}
*/

function createChart() {
  Highcharts.stockChart('container', {
    rangeSelector: {
      selected: 4
    },
    yAxis: {
      labels: {
        formatter: function () {
          return (this.value > 0 ? ' + ' : '') + this.value + '%';
        }
      },
      plotLines: [{
        value: 0,
        width: 2,
        color: 'silver'
      }]
    },
    title: {
      text: 'Stock Master'
    },
    subtitle: {
      text: 'Stay updated'
    },
    plotOptions: {
      series: {
        compare: 'percent',
        showInNavigator: true
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
      valueDecimals: 2,
      split: true
    },
    /*
    series: [{
      name: 'Google',
      data: formattedData
    }]
    */
    series: seriesOptions
  });
}

window.onload = createChart;
