$(() => {
  const socket = io();
  const corsProxy = 'https://ajibs-cors-anywhere.herokuapp.com/';

  // ADD STOCK
  $('.add-stock').submit((e) => {
    const stockName = $('#m').val().toLowerCase();
    const url = `https://www.quandl.com/api/v3/datasets/wiki/${stockName}.json?start_date=2016-01-01&end_date=2017-11-02&order=asc&column_index=4&api_key=PSk62mMsvFBdWw3Fc7y2`;


    if (companyArray.includes(stockName)) {
      e.preventDefault();
      alert('code exists');
      $('#m').val('');
      return;
    }

    $.getJSON(corsProxy + url, (result) => {
      // format data properly for chart
      const formattedData = result.dataset.data.map((element) => {
        // used const because variable assignment does not change; the value does;
        const givenDate = new Date(element[0]).getTime();
        const stockPrice = element[1];
        return [givenDate, stockPrice];
      });

      stockOptions.push({ name: stockName, data: formattedData });
      companyArray.push(stockName);
      // draw chart
      createChart(stockOptions);

      // write stock name to screen
      $('#container').append($('<p>').text(stockName));
      $('#m').val('');

      // send stock name to server
      socket.emit('chat message', stockName);
    }).catch(() => {
      alert('incorrect code');
      $('#m').val('');
    });

    return false;

  });


  // socket listener: when server emits message
  socket.on('chat message', (msg) => {
    $('#container').append($('<p>').text(msg));

    const url = `https://www.quandl.com/api/v3/datasets/wiki/${msg}.json?start_date=2016-01-01&end_date=2017-11-02&order=asc&column_index=4&api_key=PSk62mMsvFBdWw3Fc7y2`;
    $.getJSON(corsProxy + url, (result) => {
      // console.log(result.dataset.data);

      const formattedData = result.dataset.data.map((element) => {
        // used const because variable assignment does not change; only the value does
        const givenDate = new Date(element[0]).getTime();
        const stockPrice = element[1];
        return [givenDate, stockPrice];
      });

      stockOptions.push({ name: msg, data: formattedData });
      companyArray.push(msg);

      createChart(stockOptions);
    }).catch(() => {
      alert('error');
      $('#m').val('');
    });
  });


  // REMOVE STOCK
  $('.stock-details').submit(function(e) {
    e.preventDefault();
    // remove from page
    $(this).remove();

    // repaint graph;
    const stockToRemove = this.id;
    stockOptions = stockOptions.filter(modifiedSeries => modifiedSeries.name !== stockToRemove);
    companyArray = companyArray.filter(modifiedCompany => modifiedCompany !== stockToRemove);

    createChart(stockOptions);

    // emit stock to server for removal
    socket.emit('remove stock', stockToRemove);
  });

  socket.on('remove stock', (stockToRemove) => {
    // remove from page
    $(`#${stockToRemove}`).remove();

    // repaint graph
    stockOptions = stockOptions.filter(modifiedSeries => modifiedSeries.name !== stockToRemove);
    companyArray = companyArray.filter(modifiedCompany => modifiedCompany !== stockToRemove);

    createChart(stockOptions);
  });
});
