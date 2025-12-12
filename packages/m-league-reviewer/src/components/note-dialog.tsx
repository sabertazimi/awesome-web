import { BookTextIcon } from 'lucide-react'
import { NoteEditor } from '@/components/note-editor'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface NoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * 复盘笔记对话框组件
 * 用于管理从对局复盘中提炼的文本记录
 */
export function NoteDialog({ open, onOpenChange }: NoteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-full p-0 sm:max-w-full"
        disableCloseButton
        onInteractOutside={(event) => {
          if (
            event.detail.originalEvent.target instanceof Element
            && event.detail.originalEvent.target.closest('.group.toast')
          ) {
            event.preventDefault()
          }
        }}
      >
        <div className="flex h-screen flex-col">
          <div className="border-border flex items-center justify-between border-b px-6 py-3">
            <span className="text-muted-foreground font-mono text-xs">note.tsx</span>
            <div className="flex items-center gap-2">
              <DialogClose asChild>
                <Button size="sm">关闭</Button>
              </DialogClose>
            </div>
          </div>
          <DialogHeader className="border-border border-b px-6 py-4">
            <DialogTitle className="flex items-center justify-center gap-2 font-mono text-2xl font-bold sm:justify-start">
              <BookTextIcon className="size-6" />
              复盘笔记
            </DialogTitle>
            <DialogDescription className="sr-only">从对局复盘中提炼的文本记录</DialogDescription>
          </DialogHeader>
          <NoteEditor open={open} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
