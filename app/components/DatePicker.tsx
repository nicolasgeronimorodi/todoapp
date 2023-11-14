'use client'
import 'react-day-picker/dist/style.css'
//import ReactDayPicker from './ReactDayPicker'
import * as React from 'react'
import { CalendarDaysIcon } from '@heroicons/react/20/solid'

import { cn } from '@/lib/utils'
import { Button } from '@/shadcn/ui/button'

import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()
  let footer = <p>Please pick a day.</p>
  if (date) {
    footer = <p>You picked {format(date, 'PPP')}.</p>
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarDaysIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto bg-slate-900 p-0' align='start'>
        <DayPicker
          mode='single'
          selected={date}
          onSelect={setDate}
          footer={footer}
        />
      </PopoverContent>
    </Popover>
  )
}
