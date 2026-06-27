import React from 'react'
import { DatePicker } from 'antd';

const Calendar = ({setsltDate}) => {

  const handleDate = (date, datestring)  => {
    setsltDate(datestring)
  }

  return (
    <div>
      <DatePicker onChange={(date, datestring) => handleDate(date, datestring)}  style={{
        width: '100%',
        height: '30px'
      }} />
    </div>
  )
}

export default Calendar
