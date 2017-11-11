// stockOptions and companyArray were defined globally;
import createChart from './createChart';

function realtime() {
  const socket = io();
  const corsProxy = 'https://ajibs-cors-anywhere.herokuapp.com/';


  function formatChartData(result) {
    return result.dataset.data.map((element) => {
      // used const because variable assignment does not change; only the value does
      const givenDate = new Date(element[0]).getTime();
      const stockPrice = element[1];
      return [givenDate, stockPrice];
    });
  }


  function retrieveStockData(companyStock, emitter) {
    const url = `https://www.quandl.com/api/v3/datasets/wiki/${companyStock}.json?start_date=2016-01-01&end_date=2017-11-02&order=asc&column_index=4&api_key=PSk62mMsvFBdWw3Fc7y2`;
    $.getJSON(corsProxy + url, (stockData) => {
      stockOptions.push({ name: companyStock, data: formatChartData(stockData) });
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
