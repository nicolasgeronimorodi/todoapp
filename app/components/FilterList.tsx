'use client'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from '@/shadcn/ui/menubar'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import Link from 'next/link'

export function FilterList() {
  const router = useRouter()

  return (
    <div className='z-10 bg-slate-700'>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Filtrar por</MenubarTrigger>
          <MenubarContent className='z-10 bg-slate-700'>
            <MenubarItem
              onClick={() => {
                router.push('/todos?scheduledDateOrder=latest')
              }}
            >
              Mas reciente
            </MenubarItem>

            <MenubarItem
              onClick={() => {
                router.push('/todos?scheduledDateOrder=oldest')
              }}
            >
              Mas antiguo
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
