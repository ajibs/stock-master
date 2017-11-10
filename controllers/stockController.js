const Stock = require('../models/Stock');

exports.showHome = async (req, res) => {
  try {
    const stock = await Stock.findOne({});
    const { companies } = stock;

    if (!companies) {
      // companies are empty
      res.render('index');
      return;
    }
    res.render('index', {
      companyNames: companies,
      companyArray: JSON.stringify(companies)
    });
  } catch (e) {
    console.error(e);
  }
};


exports.showError = (req, res) => {
  res.render('error');
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
};


exports.removeStock = async (req, res) => {
  const companyStock = req.params.company;
  try {
    const stock = await Stock.findOneAndUpdate(
      {},
      {
        $pull: { companies: companyStock }
      },
      { new: true }
    );
    res.json(stock);
  } catch (e) {
    console.error(e);
  }
};


exports.start = async (req, res) => {
  const data = { companies: ['aapl'] };
  const result = await (new Stock(data)).save();
  res.json(result);
};

