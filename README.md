# house-loans
> 房屋贷款计算，有 等额本息 和 等额本金 两种算法

## 引入

```html
<script src="/dist/houseLoans.umd.js"></script>
<script >
  console.log(houseLoans)
</script>
```

```bash
npm i --save house-loans
```

```javascript
import houseLoans from 'house-loans';

// 小程序引入方法
// import houseLoans from 'house-loans/src/index.js';
```

## 使用

```javascript
// 分别是商贷利率，公积金小于等于 5 万的利率，公积金大于 5 万的利率
// 仅做参考，可能不实时更新
let { sRate, gRateLte5, gRateGt5 } = houseLoans;

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
let result = houseLoans(500000, 30, 0.049, 1);
```