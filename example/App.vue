<template>
  <div>
    <div class="tab">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="商用贷款" name="t1">
          <el-form
            v-model="shangyong.form"
            label-position="left"
            label-width="120px"
            @submit="shangyongSubmit">
            <!-- 房款总额 -->
            <el-form-item label="房款总额">
              <el-input
                v-model.number="shangyong.form.total"
                type="number"
                placeholder="请输入内容">
                <template slot="append">万</template>
              </el-input>
            </el-form-item>
            <!-- 房贷年限 -->
            <el-form-item label="房贷年限">
              <el-slider
                v-model="shangyong.form.year"
                :min="1"
                :max="30"/>
            </el-form-item>
            <!-- 利率 -->
            <el-form-item label="房贷利率">
              <el-select v-model="shangyong.form.rate" placeholder="请选择">
                <el-option
                  v-for="item in shangyong.rateArr"
                  :key="item.rate"
                  :label="`${item.label}(${Number((item.rate * 100).toFixed(3))})`"
                  :value="item.rate">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 计算 -->
            <el-form-item>
              <el-button type="primary" @click="shangyongSubmit">
                计算
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="公积金贷款" name="t2">
          <el-form
            v-model="gongjijin.form"
            label-position="left"
            label-width="120px"
            @submit="gongjijinSubmit">
            <!-- 房款总额 -->
            <el-form-item label="房款总额">
              <el-input
                v-model.number="gongjijin.form.total"
                type="number"
                placeholder="请输入内容">
                <template slot="append">万</template>
              </el-input>
            </el-form-item>
            <!-- 房贷年限 -->
            <el-form-item label="房贷年限">
              <el-slider
                v-model="gongjijin.form.year"
                :min="1"
                :max="30"/>
            </el-form-item>
            <!-- 利率 -->
            <el-form-item label="房贷利率">
              <el-select v-model="gongjijin.form.rate" placeholder="请选择">
                <el-option
                  v-for="item in gongjijin.form.year <= 5 ? gongjijin.rateArrLte5 : gongjijin.rateArrGt5"
                  :key="item.rate"
                  :label="`${item.label}(${Number((item.rate * 100).toFixed(3))})`"
                  :value="item.rate">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 计算 -->
            <el-form-item>
              <el-button type="primary" @click="gongjijinSubmit">
                计算
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="组合贷款" name="t3">
          <el-form
            v-model="zuhe.form"
            label-position="left"
            label-width="120px"
            @submit="gongjijinSubmit">
            <!-- 房款总额 -->
            <el-form-item label="公积金贷款总额">
              <el-input
                v-model.number="zuhe.form.gongjijin.total"
                type="number"
                placeholder="请输入内容">
                <template slot="append">万</template>
              </el-input>
            </el-form-item>
            <!-- 房贷年限 -->
            <el-form-item label="公积金贷款年限">
              <el-slider
                v-model="zuhe.form.gongjijin.year"
                :min="1"
                :max="30"/>
            </el-form-item>
            <!-- 利率 -->
            <el-form-item label="公积金贷款利率">
              <el-select v-model="zuhe.form.gongjijin.rate" placeholder="请选择">
                <el-option
                  v-for="item in zuhe.form.gongjijin.year <= 5 ? gongjijin.rateArrLte5 : gongjijin.rateArrGt5"
                  :key="item.rate"
                  :label="`${item.label}(${Number((item.rate * 100).toFixed(3))})`"
                  :value="item.rate">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- space -->
            <el-divider/>
            <!-- 商贷总额 -->
            <el-form-item label="商贷总额">
              <el-input
                v-model.number="zuhe.form.shangyong.total"
                type="number"
                placeholder="请输入内容">
                <template slot="append">万</template>
              </el-input>
            </el-form-item>
            <!-- 商贷年限 -->
            <el-form-item label="商贷年限">
              <el-slider
                v-model="zuhe.form.shangyong.year"
                :min="1"
                :max="30"/>
            </el-form-item>
            <!-- 商贷利率 -->
            <el-form-item label="商贷利率">
              <el-select v-model="zuhe.form.shangyong.rate" placeholder="请选择">
                <el-option
                  v-for="item in shangyong.rateArr"
                  :key="item.rate"
                  :label="`${item.label}(${Number((item.rate * 100).toFixed(3))})`"
                  :value="item.rate">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 计算 -->
            <el-form-item>
              <el-button type="primary" @click="zuheSubmit">
                计算
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="result" v-if="resultArr && resultArr.length">
      <el-row :gutter="30">
        <el-col :span="12">
          <div>
            <el-tag>
              等额本息
            </el-tag>
            <el-tag type="success">
              每月还款：{{ resultArr[0].monthRepayment }}
            </el-tag>
            <el-tag type="warning">
              利息总额：{{ resultArr[0].grossInterest }}
            </el-tag>
          </div>
          <el-table :data="resultArr[0].bill">
            <el-table-column
              prop="i"
              label="期数"
              width="180"/>
            <el-table-column
              prop="total"
              label="月供总额"
              width="180"/>
            <el-table-column
              prop="benjin"
              label="月供本金"
              width="180"/>
            <el-table-column
              prop="lixi"
              label="月供利息"/>
            <el-table-column
              prop="shengyu"
              label="剩余本金"/>
          </el-table>
        </el-col>
        <el-col :span="12">
          <div>
            <el-tag>
              等额本金
            </el-tag>
            <el-tag type="success">
              首月还款：{{ resultArr[1].monthRepayment }}
            </el-tag>
            <el-tag type="info">
              月供增幅：{{ resultArr[1].monthIncrease }}
            </el-tag>
            <el-tag type="warning">
              利息总额：{{ resultArr[1].grossInterest }}
            </el-tag>
          </div>
          <el-table :data="resultArr[1].bill">
            <el-table-column
              prop="i"
              label="期数"
              width="180"/>
            <el-table-column
              prop="total"
              label="月供总额"
              width="180"/>
            <el-table-column
              prop="benjin"
              label="月供本金"
              width="180"/>
            <el-table-column
              prop="lixi"
              label="月供利息"/>
            <el-table-column
              prop="shengyu"
              label="剩余本金"/>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import loans from '../src'

  let { sRate, gRateLte5, gRateGt5 } = loans

  export default {
    name: 'app',
    data () {
      return {
        activeName: 't3',
        shangyong: {
          form: {
            total: 100,
            year: 20,
            rate: null
          },
          rateArr: sRate
        },
        gongjijin: {
          form: {
            total: 100,
            year: 20,
            rate: null
          },
          rateArrLte5: gRateLte5,
          rateArrGt5: gRateGt5
        },
        zuhe: {
          form: {
            shangyong: {
              total: 50,
              year: 20,
              rate: null
            },
            gongjijin: {
              total: 50,
              year: 20,
              rate: null
            }
          }
        },
        resultArr: []
      }
    },
    methods: {
      shangyongSubmit () {
        let { total, year, rate } = this.shangyong.form
        let result1 = loans(total * 10000, year, rate, 0)
        let result2 = loans(total * 10000, year, rate, 1)

        // 格式化 bill
        _.each([ result1, result2 ], result => {
          result.bill = this.formatBill(result.bill)
        })

        this.resultArr = [ result1, result2 ]
      },
      gongjijinSubmit () {
        let { total, year, rate } = this.gongjijin.form
        let result1 = loans(total * 10000, year, rate, 0)
        let result2 = loans(total * 10000, year, rate, 1)

        // 格式化 bill
        _.each([ result1, result2 ], result => {
          result.bill = this.formatBill(result.bill)
        })

        this.resultArr = [ result1, result2 ]
      },
      zuheSubmit () {
        let { shangyong, gongjijin } = this.zuhe.form
        let resultArr = _
          .chain([ shangyong, gongjijin ])
          // 计算出商贷和公积金贷的结果
          // [['商等额本息', '商等额本金'], ['公等额本息', '公等额本金']]
          .map((item, i) => {
            let { total, year, rate } = item
            let result1 = loans(total * 10000, year, rate, 0)
            let result2 = loans(total * 10000, year, rate, 1)

            return [ result1, result2 ]
          })
          .tap(resultArr => {
            console.log('--------------------------------------')
            console.log('计算出了商贷和公积金贷的结果')
            console.log(resultArr)
            console.log('--------------------------------------')
            console.log('')
          })
          // 分组商贷和公积金贷款
          // [['商等额本息', '公等额本息'], ['商等额本金', '公等额本金']]
          .thru(resultArr => {
            return [
              [ resultArr[ 0 ][ 0 ], resultArr[ 1 ][ 0 ] ],
              [ resultArr[ 0 ][ 1 ], resultArr[ 1 ][ 1 ] ]
            ]
          })
          .tap(resultArr => {
            console.log('--------------------------------------')
            console.log('手动分组等额本金和等额本息')
            console.log(resultArr)
            console.log('--------------------------------------')
            console.log('')
          })
          // 合并两种模式的等额本金和等额本息
          // [ 等额本息, 等额本金 ]
          .map((arr, i) => {
            return assign(...arr)
            function assign (...args) {
              return _.assignWith({}, ...args, merge)
            }
            function merge (oldValue, srcValue) {
              if (_.isNumber(oldValue)) {
                return _.round(oldValue + srcValue, 2)
              }
              // 公贷和商贷年限可能不一样
              // 这里根据账单月长度确定最大年限
              // 并合并每个月对应的的钱数
              else if (_.isArray(oldValue)) {
                let longArr = null
                let shortArr = null
                let oldLength = oldValue.length
                let srcLength = srcValue.length

                // 确定长、短账单数组
                if (oldLength > srcLength) {
                  longArr = oldValue
                  shortArr = srcValue
                }
                else {
                  longArr = srcValue
                  shortArr = oldValue
                }

                return _.map(longArr, (itemArr, i) => {
                  return _.map(itemArr, (item, j) => {
                    // 防止不存在而发生的报错
                    shortArr[ i ] = shortArr[ i ] || []
                    shortArr[ i ][ j ] = shortArr[ i ][ j ] || 0
                    // 合并账单金额
                    return _.round(longArr[ i ][ j ] + shortArr[ i ][ j ], 2)
                  })
                })
              }
            }
          })
          .tap(resultArr => {
            console.log('--------------------------------------')
            console.log('合并了商贷和公积金贷款的等额本金和等额本息')
            console.log(resultArr)
            console.log('--------------------------------------')
            console.log('')
          })
          .value()

        // 格式化 bill
        _.each(resultArr, result => {
          result.bill = this.formatBill(result.bill)
        })

        this.resultArr = _.cloneDeep(resultArr)
      },
      formatBill (bill) {
        return _.map(bill, (item, i) => {
          return {
            i: i + 1,
            total: item[ 0 ],
            benjin: item[ 1 ],
            lixi: item[ 2 ],
            shengyu: item[ 3 ]
          }
        })
      }
    },
    watch: {
      activeName () {
        this.resultArr = []
      },
      'gongjijin.form.year' () {
        this.gongjijin.form.rate = null
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
  }

  .el-tag + .el-tag {
    margin-left: 5px;
  }

  .tab {
    width: 800px;
    display: block;
    margin: 0 auto;
  }
  .result {
    display: block;
    padding: 30px;
    margin: 0 auto;
  }
</style>
