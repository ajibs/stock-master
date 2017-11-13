// stockOptions and companyArray were defined globally;
import createChart from './createChart';
import { generateURL, formatChartData } from './helpers';


function loadHome() {
  companyArray.forEach((company) => {
    const url = generateURL(company);
    $.getJSON(url, (stockData) => {
      stockOptions.push({
        name: `${company}`,
        data: formatChartData(stockData)
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
