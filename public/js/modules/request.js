// stockOptions and companyArray are defined globally;

import { generateURL, generateHTML, formatChartData, sanitizeData } from './helpers';
import createChart from './createChart';

const socket = io();


function removeStock(stockToRemove, emitter) {
  $(`#${stockToRemove}`).parent().remove();

  // repaint graph;
  stockOptions = stockOptions.filter(modifiedSeries => modifiedSeries.name !== String(stockToRemove));
  companyArray = companyArray.filter(modifiedCompany => modifiedCompany !== String(stockToRemove));
  createChart(stockOptions);

  // emit stock to server for removal
  if (emitter) {
    socket.emit('remove stock', stockToRemove);
  }
}


function appendStockToScreen(name) {
  const html = generateHTML(name);

  $('#all-stocks').append(html);
  $('#stock-name').val('');

  // add remove stock listener to newly appended buttons
  $(`#${name}`).click(function() {
    removeStock(sanitizeData(this.id), true);
  });
}


function setColor(stockArray) {
  let color = 0;
  // use different colors for repaint
  if (stockArray.length) {
    const lastStock = stockArray[stockArray.length - 1];
    color = (lastStock._colorIndex) + 1;
  }
  return color;
}


function retrieveStockData(companyStock, emitter) {
  const url = generateURL(companyStock);
  $.getJSON(url, (stockData) => {
    stockOptions.push({
      name: companyStock,
      data: formatChartData(stockData),
      _colorIndex: setColor(stockOptions)
    });
    companyArray.push(companyStock);
    createChart(stockOptions);

    appendStockToScreen(companyStock);

    // EMITTER: send stock name to server
    if (emitter) {
      socket.emit('add stock', companyStock);
    }
  }).catch(() => {
    alert('incorrect code');
    $('#stock-name').val('');
  });
}


export { removeStock, retrieveStockData, socket };
