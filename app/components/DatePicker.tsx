'use client'
import 'react-day-picker/dist/style.css'
//import ReactDayPicker from './ReactDayPicker'
import * as React from 'react'
import { CalendarDaysIcon } from '@heroicons/react/20/solid'

import { cn } from '@/lib/utils'
import { Button } from '@/shadcn/ui/button'
//import type { ActiveModifiers } from 'react-day-picker'
import type { SelectSingleEventHandler } from 'react-day-picker'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { string } from 'zod'

interface DatePickerProps {
  selectedDate: Date | undefined
  onSelectDate?: () => void
  onDateChange: SelectSingleEventHandler
  placeholder: string
}

export function DatePickerDemo({
  selectedDate,
  onDateChange,
  onSelectDate,
  placeholder
}: DatePickerProps) {
  let footer = <p>Elegir una fecha</p>
  if (selectedDate) {
    footer = <p>You picked {format(selectedDate, 'PPP')}.</p>
  }

  if (onSelectDate) {
    onSelectDate()
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !selectedDate && 'text-muted-foreground'
          )}
        >
          <CalendarDaysIcon className='mr-2 h-4 w-4' />
          {selectedDate ? (
            format(selectedDate, 'PPP')
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto bg-slate-900 p-0' align='start'>
        <DayPicker
          mode='single'
          selected={selectedDate}
          onSelect={onDateChange}
          footer={footer}
        />
      </PopoverContent>
    </Popover>
  )
}
