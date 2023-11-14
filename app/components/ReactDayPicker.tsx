import 'react-day-picker/dist/style.css'
import { useState } from 'react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'

export default function ReactDayPicker() {
  const [selected, setSelected] = useState<Date>()

  let footer = <p>Please pick a day.</p>
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>
  }
  return (
    <DayPicker
      className='z-20'
      mode='single'
      selected={selected}
      onSelect={setSelected}
      footer={footer}
    />
  )
}
