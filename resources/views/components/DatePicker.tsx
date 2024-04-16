import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker, MobileDatePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from '../..//js/helper/dayjs'

const DatePicker: React.FunctionComponent<MobileDatePickerProps<Dayjs>> = (
  props
) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker {...props} />
    </LocalizationProvider>
  )
}

export default DatePicker
