// stockOptions and companyArray are defined globally;

import { sanitizeData } from './helpers';
import { removeStock, retrieveStockData, socket } from './request';


function realtime() {
  // EVENT LISTENERS

  $('.danger').click(function () {
    // remove stock from screen and emit message to server
    removeStock(sanitizeData(this.id), true);
  });


  $('.add-stock-form').submit((e) => {
    e.preventDefault();
    const stockName = $('#stock-name').val().toLowerCase();

    if (companyArray.includes(stockName)) {
      alert('Code Exists');
      $('#stock-name').val('');
      return;
    }
    // retrieve stock data and emit message to server
    retrieveStockData(sanitizeData(stockName), true);
  });


  socket.on('add stock', (stockToAdd) => {
    // only retrieve stock data
    retrieveStockData(sanitizeData(stockToAdd), false);
  });


  socket.on('remove stock', (stockToRemove) => {
    // only remove stock from page
    removeStock(sanitizeData(stockToRemove), false);
  });
}


export default realtime;
