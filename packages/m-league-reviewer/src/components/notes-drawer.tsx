import { BookTextIcon } from 'lucide-react'
import NotesEditor from '@/components/notes-editor'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'

interface NotesDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * 复盘笔记抽屉组件
 * 用于管理从对局复盘中提炼的文本记录
 */
export function NotesDrawer({ open, onOpenChange }: NotesDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="data-[vaul-drawer-direction=left]:w-full data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=left]:sm:max-w-full data-[vaul-drawer-direction=right]:sm:max-w-full">
        <div className="flex h-full flex-col">
          <div className="border-border flex items-center justify-between border-b px-6 py-3">
            <span className="text-muted-foreground font-mono text-xs">notes.tsx</span>
            <div className="flex items-center gap-2">
              <DrawerClose asChild>
                <Button size="sm">关闭</Button>
              </DrawerClose>
            </div>
          </div>
          <DrawerHeader className="border-border border-b">
            <DrawerTitle className="text-foreground mt-1 flex items-center gap-2 font-mono text-2xl font-bold">
              <BookTextIcon className="size-6" />
              复盘笔记
            </DrawerTitle>
          </DrawerHeader>
          <NotesEditor open={open} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
