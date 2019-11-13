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
let loans = function (total, year, yearRate, mode = 0) {
  // 还款总月份
  let monthLength = year * 12
  // 月利率
  let monthRate = yearRate / 12
  // 剩余待还本金
  let tmpTotal = total
  // 账单
  let bill = []
  
  // 生成账单
  for (let i = 0; i < monthLength; i++) {
    let repaymentTotal = (function () {
      switch (mode) {
        case 0: {
          return (total * monthRate * Math.pow(1 + monthRate, monthLength)) / (Math.pow(1 + monthRate, monthLength) - 1)
        }
        case 1: {
          return (total / monthLength) + (total - (total - tmpTotal)) * monthRate
        }
      }
    })()
    let lixi = (function () {
      switch (mode) {
        case 0: {
          return tmpTotal * monthRate
        }
        case 1: {
          return tmpTotal * monthRate
        }
      }
    })()
    let btnjin = (function () {
      switch (mode) {
        case 0: {
          return repaymentTotal - lixi
        }
        case 1: {
          return total / monthLength
        }
      }
    })()
    
    // 向下取整
    repaymentTotal = floor(repaymentTotal)
    lixi = floor(lixi)
    btnjin = floor(btnjin)
    
    // 计算剩余本金
    tmpTotal = floor(tmpTotal - btnjin)
    
    // 清除误差
    if (i === monthLength - 1) {
      tmpTotal = 0
    }
    
    bill.push([
      repaymentTotal,
      btnjin,
      lixi,
      tmpTotal
    ])
  }
  
  // 月供
  let monthRepayment = bill[ 0 ][ 0 ]
  // 月供差异, mode = 1 时值有效
  let monthIncrease = floor(bill[ 1 ][ 0 ] - bill[ 0 ][ 0 ])
  // 总利息
  let grossInterest = (function () {
    let sum = 0
    bill.forEach(item => {
      sum += item[ 2 ]
    })
    return floor(sum)
  })()
  
  return {
    bill,
    monthRepayment,
    monthIncrease,
    grossInterest
  }
}

// 商用贷款利率
loans.sRate = [
  {
    label: '基准利率',
    rate: 0.049
  },
  {
    label: '基准利率7折',
    rate: 0.0343
  },
  {
    label: '基准利率75折',
    rate: 0.03675
  },
  {
    label: '基准利率8折',
    rate: 0.0392
  },
  {
    label: '基准利率85折',
    rate: 0.0417
  },
  {
    label: '基准利率9折',
    rate: 0.0441
  },
  {
    label: '基准利率95折',
    rate: 0.0466
  },
  {
    label: '基准利率1.05倍',
    rate: 0.0515
  },
  {
    label: '基准利率1.1倍',
    rate: 0.0539
  },
  {
    label: '基准利率1.2倍',
    rate: 0.0588
  },
  {
    label: '基准利率1.3倍',
    rate: 0.0637
  }
]

// 公积金贷款利率
loans.gRateLte5 = [
  {
    label: '基准利率',
    rate: 0.0275
  },
  {
    label: '基准利率1.1倍',
    rate: 0.03025
  },
  {
    label: '基准利率1.2倍',
    rate: 0.033
  },
  {
    label: '基准利率1.3倍',
    rate: 0.03575
  }
]
loans.gRateGt5 = [
  {
    label: '基准利率',
    rate: 0.0325
  },
  {
    label: '基准利率1.1倍',
    rate: 0.0358
  },
  {
    label: '基准利率1.2倍',
    rate: 0.039
  },
  {
    label: '基准利率1.3倍',
    rate: 0.0423
  }
]

// 保留两位小数
function floor (num) {
  return Number(num.toFixed(2))
}

export default loans