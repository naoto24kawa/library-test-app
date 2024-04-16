import dayjs, { Dayjs } from 'dayjs'

// 最大値・最小値の計算するための拡張プラグイン
import minMax from 'dayjs/plugin/minMax'

// 日本時間に変換する
import 'dayjs/locale/ja'

// プラグイン拡張
dayjs.extend(minMax)
dayjs.locale('ja')

const enum Unit {
  day = 'day',
  week = 'week',
  month = 'month',
  quarter = 'quarter',
  year = 'year',
  hour = 'hour',
  minute = 'minute',
  second = 'second',
  millisecond = 'millisecond',
}

export { dayjs, Unit, Dayjs }
