const corsProxy = 'https://stock-cors.herokuapp.com/';


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


function generateURL(name) {
  const [startDate, endDate] = generateDate();
  const api = `https://www.quandl.com/api/v3/datasets/wiki/${name}.json?start_date=${startDate}&end_date=${endDate}&order=asc&column_index=4&api_key=PSk62mMsvFBdWw3Fc7y2`;
  return (corsProxy + api);
}


function formatChartData(result) {
  return result.dataset.data.map((element) => {
    // used const because variable assignment does not change; only the value does
    const givenDate = new Date(element[0]).getTime();
    const stockPrice = element[1];
    return [givenDate, stockPrice];
  });
}


export { generateURL, formatChartData };
