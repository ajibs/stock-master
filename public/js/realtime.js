$(() => {
  const socket = io();
  $('form').submit(() => {
    const stockName = $('#m').val();
    const url = `https://www.quandl.com/api/v3/datasets/wiki/${stockName}.json?start_date=2016-01-01&end_date=2017-11-02&order=asc&column_index=4&api_key=PSk62mMsvFBdWw3Fc7y2`;
    $.getJSON(url, (result) => {
      console.log(result.dataset.data);

      // format data properly for chart
      const formattedData = result.dataset.data.map((element) => {
        // used const because variable assignment does not change; the value does;
        const givenDate = new Date(element[0]).getTime();
        const stockPrice = element[1];
        return [givenDate, stockPrice];
      });


      seriesOptions = [{ name: stockName, data: formattedData }];
      // draw chart
      createChart();

      // write stock name to screen
      $('#container').append($('<p>').text(stockName));

      // send stock name to server
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
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
    $.getJSON(url, (result) => {
      console.log(result.dataset.data);
      const formattedData = result.dataset.data.map((element) => {
        // used const because variable assignment does not change; only the value does
        const givenDate = new Date(element[0]).getTime();
        const stockPrice = element[1];
        return [givenDate, stockPrice];
      });

      seriesOptions = [{ name: msg, data: formattedData }];
      createChart();
    }).catch(() => {
      alert('error');
      $('#m').val('');
    });
  });
});
