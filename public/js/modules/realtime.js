// stockOptions and companyArray were defined globally;
import createChart from './createChart';
import { generateURL, formatChartData } from './helpers';


function realtime() {
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
    const html = `
      <div class="stock-details">
        <h2>${name}</h2>
        <button id="${name}">Remove</button>
      </div>
    `;

    $('#allStocks').append(html);
    $('#stockName').val('');

    // add remove stock listener to newly appended buttons
    $(`#${name}`).click(function() {
      removeStock(this.id, true);
    });
  }


  function retrieveStockData(companyStock, emitter) {
    const url = generateURL(companyStock);
    $.getJSON(url, (stockData) => {
      stockOptions.push({
        name: companyStock,
        data: formatChartData(stockData)
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
      $('#stockName').val('');
    });
  }


  // EVENT LISTENERS
  $(() => {
    // ADD STOCK
    $('.addStockForm').submit((e) => {
      e.preventDefault();
      const stockName = $('#stockName').val().toLowerCase();

      if (companyArray.includes(stockName)) {
        alert('code exists');
        $('#stockName').val('');
        return;
      }

      // retrieve stock data and emit message via sockets
      retrieveStockData(stockName, true);
    });


    // RECEIVER: when server emits message in realtime
    socket.on('add stock', (stockToAdd) => {
      // only retrieve stock data
      retrieveStockData(stockToAdd, false);
    });


    // REMOVE STOCK
    $('button').click(function () {
      removeStock(this.id, true);
    });

    // RECEIVER: when server emits message in realtime
    socket.on('remove stock', (stockToRemove) => {
      // only remove stock from page
      removeStock(stockToRemove, false);
    });
  });
}


export default realtime;
