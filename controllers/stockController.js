const axios = require('axios');

exports.showHome = (req, res) => {
  const companyNames = ['AAPL', 'GOOGL', 'MSFT'];

  // get stock data for each company
  // save to seriesOptions

  const seriesOptions = [];
  companyNames.forEach((company) => {
    const url = `https://www.quandl.com/api/v3/datasets/wiki/${company}.json?start_date=2016-01-01&end_date=2017-11-02&order=asc&column_index=4&api_key=${process.env.STOCK_API}`;
    axios
      .get(url)
      .then((result) => {
        const formattedData = result.data.dataset.data.map((element) => {
          const givenDate = new Date(element[0]).getTime();
          const stockPrice = element[1];
          return [givenDate, stockPrice];
        });

        seriesOptions.push({
          name: `${company}`,
          data: formattedData
        });

        if (seriesOptions.length === companyNames.length) {
          // render home page
          res.render('index', {
            seriesOptions: JSON.stringify(seriesOptions)
          });
        }
      })
      .catch((e) => {
        console.error(e);
        res.send('Error');
      });
  });

  // need to refactor this function
  // get all data for companies before rendering home page
  // create promise for all companies
  // if all promises resolve; render home page
  // else render error
};


exports.test = (req, res) => {
  res.render('error');
};
