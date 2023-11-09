import dayjs from 'dayjs'
import 'dayjs/plugin/isSameOrAfter.js'
import 'dayjs/plugin/isSameOrBefore.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'

import 'dayjs/locale/ja.js'

import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
dayjs.extend(relativeTime)
dayjs.locale('ja')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

export default dayjs
