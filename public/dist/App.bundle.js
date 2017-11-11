/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stocksTheme = __webpack_require__(6);

var _stocksTheme2 = _interopRequireDefault(_stocksTheme);

var _loadHome = __webpack_require__(7);

var _loadHome2 = _interopRequireDefault(_loadHome);

var _realtime = __webpack_require__(8);

var _realtime2 = _interopRequireDefault(_realtime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _stocksTheme2.default)();
(0, _loadHome2.default)();
(0, _realtime2.default)();

/*
script(src="js/loadHome.js")
script(src="/js/realtime.js")
script(src="js/stocksTheme.js")
script(src="js/createChart.js")
*/

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Create the chart when all data is loaded
* @returns {undefined}
*/

function createChart(seriesOptions) {
  Highcharts.stockChart('container', {
    rangeSelector: {
      selected: 4
    },
    yAxis: {
      labels: {
        formatter: function formatter() {
          return (this.value > 0 ? ' + ' : '') + this.value + '%';
        }
      },
      plotLines: [{
        value: 0,
        width: 2,
        color: 'silver'
      }]
    },
    title: {
      text: 'Stock Master'
    },
    subtitle: {
      text: 'Stay updated'
    },
    plotOptions: {
      series: {
        compare: 'percent'
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
      valueDecimals: 2
    },
    size: {
      height: 400
    },
    series: seriesOptions
  });
}

exports.default = createChart;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * (c) 2010-2017 Torstein Honsi
 *
 * License: www.highcharts.com/license
 *
 * Grid-light theme for Highcharts JS
 * @author Torstein Honsi
 */

// Dark Unica theme
/* global document */
// Load the fonts

function darkUnicaTheme() {
  Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Unica+One',
    rel: 'stylesheet',
    type: 'text/css'
  }, null, document.getElementsByTagName('head')[0]);

  Highcharts.theme = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      backgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 1,
          y2: 1
        },
        stops: [[0, '#2a2a2b'], [1, '#3e3e40']]
      },
      style: {
        fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
    },
    title: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase',
        fontSize: '20px'
      }
    },
    subtitle: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase'
      }
    },
    xAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
        style: {
          color: '#A0A0A3'

        }
      }
    },
    yAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
        color: '#F0F0F0'
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: '#B0B0B3'
        },
        marker: {
          lineColor: '#333'
        }
      },
      boxplot: {
        fillColor: '#505053'
      },
      candlestick: {
        lineColor: 'white'
      },
      errorbar: {
        color: 'white'
      }
    },
    legend: {
      itemStyle: {
        color: '#E0E0E3'
      },
      itemHoverStyle: {
        color: '#FFF'
      },
      itemHiddenStyle: {
        color: '#606063'
      }
    },
    credits: {
      style: {
        color: '#666'
      }
    },
    labels: {
      style: {
        color: '#707073'
      }
    },

    drilldown: {
      activeAxisLabelStyle: {
        color: '#F0F0F3'
      },
      activeDataLabelStyle: {
        color: '#F0F0F3'
      }
    },

    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        theme: {
          fill: '#505053'
        }
      }
    },

    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: '#505053',
        stroke: '#000000',
        style: {
          color: '#CCC'
        },
        states: {
          hover: {
            fill: '#707073',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          },
          select: {
            fill: '#000003',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          }
        }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
        backgroundColor: '#333',
        color: 'silver'
      },
      labelStyle: {
        color: 'silver'
      }
    },

    navigator: {
      handles: {
        backgroundColor: '#666',
        borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
        color: '#7798BF',
        lineColor: '#A6C7ED'
      },
      xAxis: {
        gridLineColor: '#505053'
      }
    },

    scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
    },

    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#C0C0C0',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)'
  };

  // Apply the theme
  Highcharts.setOptions(Highcharts.theme);
}

exports.default = darkUnicaTheme;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // stockOptions and companyArray were defined globally;


var _createChart = __webpack_require__(5);

var _createChart2 = _interopRequireDefault(_createChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadHome() {
  function generateDate() {
    var d = new Date();
    var currentYear = d.getFullYear();
    var currentMonth = d.getMonth() + 1;
    var currentDay = d.getDate();

    var previousYear = currentYear - 1;
    var startDate = previousYear + '-' + currentMonth + '-' + currentDay;
    var endDate = currentYear + '-' + currentMonth + '-' + currentDay;

    return [startDate, endDate];
  }

  var _generateDate = generateDate(),
      _generateDate2 = _slicedToArray(_generateDate, 2),
      startDate = _generateDate2[0],
      endDate = _generateDate2[1];

  var corsProxy = 'https://ajibs-cors-anywhere.herokuapp.com/';

  companyArray.forEach(function (name) {
    var url = 'https://www.quandl.com/api/v3/datasets/wiki/' + name + '.json?start_date=' + startDate + '&end_date=' + endDate + '&order=asc&column_index=4&api_key=PSk62mMsvFBdWw3Fc7y2';
    $.getJSON(corsProxy + url, function (result) {
      var formattedData = result.dataset.data.map(function (element) {
        var givenDate = new Date(element[0]).getTime();
        var stockPrice = element[1];
        return [givenDate, stockPrice];
      });

      stockOptions.push({
        name: '' + name,
        data: formattedData
      });

      // create chart when all data loads
      if (stockOptions.length === companyArray.length) {
        console.log('creating chart');
        (0, _createChart2.default)(stockOptions);
      }
    });
  });
}

exports.default = loadHome;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createChart = __webpack_require__(5);

var _createChart2 = _interopRequireDefault(_createChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function realtime() {
  var socket = io();
  var corsProxy = 'https://ajibs-cors-anywhere.herokuapp.com/';

  function formatChartData(result) {
    return result.dataset.data.map(function (element) {
      // used const because variable assignment does not change; only the value does
      var givenDate = new Date(element[0]).getTime();
      var stockPrice = element[1];
      return [givenDate, stockPrice];
    });
  }

  function retrieveStockData(companyStock, emitter) {
    var url = 'https://www.quandl.com/api/v3/datasets/wiki/' + companyStock + '.json?start_date=2016-01-01&end_date=2017-11-02&order=asc&column_index=4&api_key=PSk62mMsvFBdWw3Fc7y2';
    $.getJSON(corsProxy + url, function (stockData) {
      stockOptions.push({ name: companyStock, data: formatChartData(stockData) });
      companyArray.push(companyStock);
      (0, _createChart2.default)(stockOptions);

      appendStockToScreen(companyStock);

      // EMITTER: send stock name to server
      if (emitter) {
        socket.emit('add stock', companyStock);
      }
    }).catch(function () {
      alert('incorrect code');
      $('#stockName').val('');
    });
  }

  function removeStock(stockToRemove, emitter) {
    $('#' + stockToRemove).parent().remove();

    // repaint graph;
    stockOptions = stockOptions.filter(function (modifiedSeries) {
      return modifiedSeries.name !== String(stockToRemove);
    });
    companyArray = companyArray.filter(function (modifiedCompany) {
      return modifiedCompany !== String(stockToRemove);
    });
    (0, _createChart2.default)(stockOptions);

    // emit stock to server for removal
    if (emitter) {
      socket.emit('remove stock', stockToRemove);
    }
  }

  function appendStockToScreen(name) {
    var html = '\n      <div class="stock-details">\n        <h2>' + name + '</h2>\n        <button id="' + name + '">Remove</button>\n      </div>\n    ';

    $('#allStocks').append(html);
    $('#stockName').val('');

    // add remove stock listener to newly appended buttons
    $('#' + name).click(function () {
      removeStock(this.id, true);
    });
  }

  $(function () {
    // ADD STOCK
    $('.addStockForm').submit(function (e) {
      e.preventDefault();
      var stockName = $('#stockName').val().toLowerCase();

      if (companyArray.includes(stockName)) {
        alert('code exists');
        $('#stockName').val('');
        return;
      }

      // retrieve stock data and emit message via sockets
      retrieveStockData(stockName, true);
    });

    // RECEIVER: when server emits message in realtime
    socket.on('add stock', function (stockToAdd) {
      // only retrieve stock data
      retrieveStockData(stockToAdd, false);
    });

    // REMOVE STOCK
    $('button').click(function () {
      removeStock(this.id, true);
    });

    // RECEIVER: when server emits message in realtime
    socket.on('remove stock', function (stockToRemove) {
      // only remove stock from page
      removeStock(stockToRemove, false);
    });
  });
} // stockOptions and companyArray were defined globally;
exports.default = realtime;

/***/ })
/******/ ]);
//# sourceMappingURL=App.bundle.js.map