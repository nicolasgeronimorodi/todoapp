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

import Link from 'next/link'

export function FilterList() {
  return (
    <div className='z-10 bg-slate-700'>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Filtrar por</MenubarTrigger>
          <MenubarContent className='z-10 bg-slate-700'>
            <Link href={'/latest'}>
              <MenubarItem>Mas reciente</MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
