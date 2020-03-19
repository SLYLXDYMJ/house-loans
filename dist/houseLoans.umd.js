(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["houseLoans"] = factory();
	else
		root["houseLoans"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./src/index.js
/**
 *  @params { Number } total    - 房贷总价
 *  @params { Number } yearRate - 贷款年限
 *  @params { Number } rate     - 贷款利率
 *  @params { Number } [mode=0]  - 贷款模式，可选值 [0, 1]，0为等额本息，1为等额本金
 *
 *  @return { Object } result
 *  @return { Number } result.monthRepayment - 月供
 *  @return { Array }  result.bill            - 账单
 *  @return { Number } result.monthIncrease  - 每月还款增幅，mode1 时值有效
 *  @return { Number } result.grossInterest  - 总利息
 *
 *  @example
 *    // 账单
 *    [ [ '月供总额', '月供本金', '月供利息', '剩余本金' ] ]
 **/
var loans = function loans(total, year, yearRate) {
  var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  // 还款总月份
  var monthLength = year * 12; // 月利率

  var monthRate = yearRate / 12; // 剩余待还本金

  var tmpTotal = total; // 账单

  var bill = []; // 生成账单

  var _loop = function _loop(i) {
    var repaymentTotal = function () {
      switch (mode) {
        case 0:
          {
            return total * monthRate * Math.pow(1 + monthRate, monthLength) / (Math.pow(1 + monthRate, monthLength) - 1);
          }

        case 1:
          {
            return total / monthLength + (total - (total - tmpTotal)) * monthRate;
          }
      }
    }();

    var lixi = function () {
      switch (mode) {
        case 0:
          {
            return tmpTotal * monthRate;
          }

        case 1:
          {
            return tmpTotal * monthRate;
          }
      }
    }();

    var btnjin = function () {
      switch (mode) {
        case 0:
          {
            return repaymentTotal - lixi;
          }

        case 1:
          {
            return total / monthLength;
          }
      }
    }(); // 向下取整


    repaymentTotal = floor(repaymentTotal);
    lixi = floor(lixi);
    btnjin = floor(btnjin); // 计算剩余本金

    tmpTotal = floor(tmpTotal - btnjin); // 清除误差

    if (i === monthLength - 1) {
      tmpTotal = 0;
    }

    bill.push([repaymentTotal, btnjin, lixi, tmpTotal]);
  };

  for (var i = 0; i < monthLength; i++) {
    _loop(i);
  } // 月供


  var monthRepayment = bill[0][0]; // 月供差异, mode = 1 时值有效

  var monthIncrease = floor(bill[1][0] - bill[0][0]); // 总利息

  var grossInterest = function () {
    var sum = 0;
    bill.forEach(function (item) {
      sum += item[2];
    });
    return floor(sum);
  }();

  return {
    bill: bill,
    monthRepayment: monthRepayment,
    monthIncrease: monthIncrease,
    grossInterest: grossInterest
  };
}; // 商用贷款利率


loans.sRate = [{
  label: '基准利率',
  rate: 0.049
}, {
  label: '基准利率7折',
  rate: 0.0343
}, {
  label: '基准利率75折',
  rate: 0.03675
}, {
  label: '基准利率8折',
  rate: 0.0392
}, {
  label: '基准利率85折',
  rate: 0.0417
}, {
  label: '基准利率9折',
  rate: 0.0441
}, {
  label: '基准利率95折',
  rate: 0.0466
}, {
  label: '基准利率1.05倍',
  rate: 0.0515
}, {
  label: '基准利率1.1倍',
  rate: 0.0539
}, {
  label: '基准利率1.2倍',
  rate: 0.0588
}, {
  label: '基准利率1.3倍',
  rate: 0.0637
}]; // 公积金贷款利率

loans.gRateLte5 = [{
  label: '基准利率',
  rate: 0.0275
}, {
  label: '基准利率1.1倍',
  rate: 0.03025
}, {
  label: '基准利率1.2倍',
  rate: 0.033
}, {
  label: '基准利率1.3倍',
  rate: 0.03575
}];
loans.gRateGt5 = [{
  label: '基准利率',
  rate: 0.0325
}, {
  label: '基准利率1.1倍',
  rate: 0.0358
}, {
  label: '基准利率1.2倍',
  rate: 0.039
}, {
  label: '基准利率1.3倍',
  rate: 0.0423
}]; // 保留两位小数

function floor(num) {
  return Number(num.toFixed(2));
}

/* harmony default export */ var src = (loans);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=houseLoans.umd.js.map