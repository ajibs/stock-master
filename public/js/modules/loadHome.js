// stockOptions and companyArray are defined globally;

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
        createChart(stockOptions);
      }
    });
  });
}


export default loadHome;
