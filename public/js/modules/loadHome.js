// stockOptions and companyArray were defined globally;
import createChart from './createChart';

function loadHome() {
  function generateDate() {
    const d = new Date();
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth() + 1;
    const currentDay = d.getDate();

    const previousYear = currentYear - 1;
    const startDate = `${previousYear}-${currentMonth}-${currentDay}`;
    const endDate = `${currentYear}-${currentMonth}-${currentDay}`;

    return [startDate, endDate];
  }

  const [startDate, endDate] = generateDate();

  const corsProxy = 'https://ajibs-cors-anywhere.herokuapp.com/';

  companyArray.forEach((name) => {
    const url = `https://www.quandl.com/api/v3/datasets/wiki/${name}.json?start_date=${startDate}&end_date=${endDate}&order=asc&column_index=4&api_key=PSk62mMsvFBdWw3Fc7y2`;
    $.getJSON(corsProxy + url, (result) => {
      const formattedData = result.dataset.data.map((element) => {
        const givenDate = new Date(element[0]).getTime();
        const stockPrice = element[1];
        return [givenDate, stockPrice];
      });

      stockOptions.push({
        name: `${name}`,
        data: formattedData
      });

      // create chart when all data loads
      if (stockOptions.length === companyArray.length) {
        console.log('creating chart');
        createChart(stockOptions);
      }
    });
  });
}


export default loadHome;
