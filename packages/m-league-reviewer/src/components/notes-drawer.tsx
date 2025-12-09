import type { Note } from '@/api/reviews'
import { BookTextIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createNote, getNotes, updateNote } from '@/api/reviews'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Textarea } from '@/components/ui/textarea'

interface NotesDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * 复盘笔记抽屉组件
 * 用于管理从对局复盘中提炼的文本记录
 */
export function NotesDrawer({ open, onOpenChange }: NotesDrawerProps) {
  const [note, setNote] = useState<Note | null>(null)
  const [content, setContent] = useState('')

  // 加载或创建笔记
  useEffect(() => {
    if (open) {
      const notes = getNotes()
      if (notes.length === 0) {
        // 没有笔记，创建一条空笔记
        const newNote = createNote('')
        setNote(newNote)
        setContent('')
      } else {
        // 使用第一条笔记
        setNote(notes[0])
        setContent(notes[0].content)
      }
    }
  }, [open])

  // 自动保存笔记内容
  useEffect(() => {
    if (!note || !open)
      return

    const timer = setTimeout(() => {
      updateNote(note.id, content)
    }, 500) // 500ms 防抖

    return () => clearTimeout(timer)
  }, [content, note, open])

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
          <div className="flex flex-1 flex-col overflow-hidden p-6">
            {note && (
              <Textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="在此记录从对局复盘中提炼的文本内容..."
                className="flex-1 resize-none"
              />
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
