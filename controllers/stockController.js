const axios = require('axios');
const Stock = require('../models/Stock');

function getStockData(companyNames, res) {
  // get stock data for each company
  // save to seriesOptions

  const seriesOptions = [];
  companyNames.forEach((company) => {
    const url = `https://www.quandl.com/api/v3/datasets/wiki/${company}.json?start_date=2016-01-01&end_date=2017-11-02&order=asc&column_index=4&api_key=${process.env.STOCK_API}`;
    axios
      .get(url)
      .then((result) => {
        const formattedData = result.data.dataset.data.map((element) => {
          // used const because variable assignment does not change; the value does;
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
            seriesOptions: JSON.stringify(seriesOptions),
            companyNames,
            companyArray: JSON.stringify(companyNames)
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
}


exports.showHome = async (req, res) => {
  try {
    const stock = await Stock.findOne({});
    const { companies } = stock;

    if (!companies) {
      // companies are empty
      res.render('index');
      return;
    }
    // res.render('index');
    getStockData(companies, res);
  } catch (e) {
    console.error(e);
  }
};


exports.showError = (req, res) => {
  res.render('error', {
    companyNames: ['amzn', 'msft']
  });
};


exports.addStock = async (req, res) => {
  const companyStock = req.body.company;
  console.log(`Company is ${companyStock}`);

  let stock = await Stock.findOne({});

  // if no document; create new document
  if (!stock) {
    stock = new Stock();
  }

  // stock already exists
  if (stock.companies.includes(companyStock)) {
    res.send('Stock already exists');
    return;
  }

  stock.companies.push(companyStock);
  const updated = await stock.save();
  res.json(updated);
//  getStockData(updated.companies, res);
};


exports.removeStock = async (req, res) => {
  const companyStock = req.params.company;
  const stock = await Stock.findOneAndUpdate(
    {},
    {
      $pull: { companies: companyStock }
    },
    { new: true }
  );
  res.json(stock);
};
