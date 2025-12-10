import type { Editor } from '@tiptap/react'
import type { Note } from '@/api/reviews'
import { Placeholder } from '@tiptap/extensions'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  QuoteIcon,
  RedoIcon,
  SeparatorHorizontalIcon,
  SquareCodeIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
  WrapTextIcon,
  XIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { createNote, getNotes, updateNote } from '@/api/reviews'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface EditorToolbarProps {
  editor: Editor
  editorState: {
    isBold: boolean
    canBold: boolean
    isItalic: boolean
    canItalic: boolean
    isUnderline: boolean
    canUnderline: boolean
    isStrikethrough: boolean
    canStrikethrough: boolean
    isCode: boolean
    canCode: boolean
    canClearMarks: boolean
    isParagraph: boolean
    isHeading1: boolean
    isHeading2: boolean
    isHeading3: boolean
    isHeading4: boolean
    isHeading5: boolean
    isHeading6: boolean
    isOrderedList: boolean
    isBulletList: boolean
    isCodeBlock: boolean
    isBlockquote: boolean
    canUndo: boolean
    canRedo: boolean
  }
  className?: string
}

function EditorToolbar({
  editor,
  editorState: {
    isBold,
    canBold,
    isItalic,
    canItalic,
    isUnderline,
    canUnderline,
    isStrikethrough,
    canStrikethrough,
    isCode,
    canCode,
    canClearMarks,
    isParagraph,
    isHeading1,
    isHeading2,
    isHeading3,
    isHeading4,
    isHeading5,
    isHeading6,
    isOrderedList,
    isBulletList,
    isCodeBlock,
    isBlockquote,
    canUndo,
    canRedo,
  },
  className,
}: EditorToolbarProps) {
  return (
    <div
      role="toolbar"
      aria-label="Text formatting toolbar"
      className={cn(
        'bg-background flex max-w-screen flex-wrap items-center lg:justify-center gap-2 border p-1',
        className,
      )}
    >
      <ToggleGroup
        type="multiple"
        value={[
          isBold ? 'bold' : '',
          isItalic ? 'italic' : '',
          isUnderline ? 'underline' : '',
          isStrikethrough ? 'strikethrough' : '',
          isCode ? 'code' : '',
        ].filter(Boolean)}
        onValueChange={(values) => {
          const shouldBeBold = values.includes('bold')
          const shouldBeItalic = values.includes('italic')
          const shouldBeUnderline = values.includes('underline')
          const shouldBeStrikethrough = values.includes('strikethrough')
          const shouldBeCode = values.includes('code')

          if (shouldBeBold !== isBold && canBold) {
            editor.chain().focus().toggleBold().run()
          }

          if (shouldBeItalic !== isItalic && canItalic) {
            editor.chain().focus().toggleItalic().run()
          }

          if (shouldBeUnderline !== isUnderline && canUnderline) {
            editor.chain().focus().toggleUnderline().run()
          }

          if (shouldBeStrikethrough !== isStrikethrough && canStrikethrough) {
            editor.chain().focus().toggleStrike().run()
          }

          if (shouldBeCode !== isCode && canCode) {
            editor.chain().focus().toggleCode().run()
          }
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="bold" aria-label="Toggle bold" disabled={!canBold}>
                <BoldIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>粗体</div>
              <div className="text-muted-foreground">Ctrl+B</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="italic" aria-label="Toggle italic" disabled={!canItalic}>
                <ItalicIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>斜体</div>
              <div className="text-muted-foreground">Ctrl+I</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="underline" aria-label="Toggle underline" disabled={!canUnderline}>
                <UnderlineIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>下划线</div>
              <div className="text-muted-foreground">Ctrl+U</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" disabled={!canStrikethrough}>
                <StrikethroughIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>删除线</div>
              <div className="text-muted-foreground">Ctrl+Shift+S</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="code" aria-label="Toggle code" disabled={!canCode}>
                <CodeIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>代码</div>
              <div className="text-muted-foreground">Ctrl+E</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </ToggleGroup>
      <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-8" />
      <ToggleGroup
        type="single"
        value={
          isParagraph ? 'paragraph' : isHeading1 ? 'h1' : isHeading2 ? 'h2' : isHeading3 ? 'h3' : isHeading4 ? 'h4' : isHeading5 ? 'h5' : isHeading6 ? 'h6' : ''
        }
        onValueChange={(value) => {
          if (!value) {
            return
          }

          switch (value) {
            case 'paragraph':
              editor.chain().focus().setParagraph().run()
              break
            case 'h1':
              editor.chain().focus().toggleHeading({ level: 1 }).run()
              break
            case 'h2':
              editor.chain().focus().toggleHeading({ level: 2 }).run()
              break
            case 'h3':
              editor.chain().focus().toggleHeading({ level: 3 }).run()
              break
            case 'h4':
              editor.chain().focus().toggleHeading({ level: 4 }).run()
              break
            case 'h5':
              editor.chain().focus().toggleHeading({ level: 5 }).run()
              break
            case 'h6':
              editor.chain().focus().toggleHeading({ level: 6 }).run()
              break
          }
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="paragraph" aria-label="Paragraph">
                <PilcrowIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>段落</div>
              <div className="text-muted-foreground">Ctrl+Alt+0</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="h1" aria-label="Heading 1">
                <Heading1Icon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>标题 1</div>
              <div className="text-muted-foreground">Ctrl+Alt+1</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="h2" aria-label="Heading 2">
                <Heading2Icon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>标题 2</div>
              <div className="text-muted-foreground">Ctrl+Alt+2</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="h3" aria-label="Heading 3">
                <Heading3Icon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>标题 3</div>
              <div className="text-muted-foreground">Ctrl+Alt+3</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="h4" aria-label="Heading 4">
                <Heading4Icon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>标题 4</div>
              <div className="text-muted-foreground">Ctrl+Alt+4</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="h5" aria-label="Heading 5">
                <Heading5Icon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>标题 5</div>
              <div className="text-muted-foreground">Ctrl+Alt+5</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="h6" aria-label="Heading 6">
                <Heading6Icon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>标题 6</div>
              <div className="text-muted-foreground">Ctrl+Alt+6</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </ToggleGroup>
      <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-8" />
      <ToggleGroup
        type="multiple"
        value={[
          isOrderedList ? 'orderedList' : '',
          isBulletList ? 'bulletList' : '',
          isCodeBlock ? 'codeBlock' : '',
          isBlockquote ? 'blockquote' : '',
        ].filter(Boolean)}
        onValueChange={(values) => {
          const shouldBeOrderedList = values.includes('orderedList')
          const shouldBeBulletList = values.includes('bulletList')
          const shouldBeCodeBlock = values.includes('codeBlock')
          const shouldBeBlockquote = values.includes('blockquote')

          if (shouldBeOrderedList !== isOrderedList) {
            editor.chain().focus().toggleOrderedList().run()
          }

          if (shouldBeBulletList !== isBulletList) {
            editor.chain().focus().toggleBulletList().run()
          }

          if (shouldBeCodeBlock !== isCodeBlock) {
            editor.chain().focus().toggleCodeBlock().run()
          }

          if (shouldBeBlockquote !== isBlockquote) {
            editor.chain().focus().toggleBlockquote().run()
          }
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="orderedList" aria-label="Ordered list">
                <ListOrderedIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>有序列表</div>
              <div className="text-muted-foreground">Ctrl+Shift+7</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="bulletList" aria-label="Bullet list">
                <ListIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>无序列表</div>
              <div className="text-muted-foreground">Ctrl+Shift+8</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="codeBlock" aria-label="Code block">
                <SquareCodeIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>代码块</div>
              <div className="text-muted-foreground">Ctrl+Alt+C</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem value="blockquote" aria-label="Blockquote">
                <QuoteIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>引用块</div>
              <div className="text-muted-foreground">Ctrl+Shift+B</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </ToggleGroup>
      <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-8" />
      <ToggleGroup type="multiple" value={[]} onValueChange={() => {}}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem
                value="horizontalRule"
                aria-label="Horizontal rule"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
              >
                <SeparatorHorizontalIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>水平分隔线</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem
                value="hardBreak"
                aria-label="Hard break"
                onClick={() => editor.chain().focus().setHardBreak().run()}
              >
                <WrapTextIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>强制换行</div>
              <div className="text-muted-foreground">Ctrl+Enter</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem
                value="undo"
                aria-label="Undo"
                disabled={!canUndo}
                onClick={() => editor.chain().focus().undo().run()}
              >
                <UndoIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>撤销</div>
              <div className="text-muted-foreground">Ctrl+Z</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem
                value="redo"
                aria-label="Redo"
                disabled={!canRedo}
                onClick={() => editor.chain().focus().redo().run()}
              >
                <RedoIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>重做</div>
              <div className="text-muted-foreground">Ctrl+Shift+Z</div>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex size-full items-center justify-center">
              <ToggleGroupItem
                value="clearMarks"
                aria-label="Clear marks"
                disabled={!canClearMarks}
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
              >
                <XIcon className="size-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <div>清除格式</div>
            </div>
          </TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </div>
  )
}

export function NoteEditor({ open }: { open: boolean }) {
  const [note, setNote] = useState<Note | null>(null)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        emptyNodeClass:
          'before:content-[attr(data-placeholder)] before:float-left before:text-muted-foreground before:h-0 before:pointer-events-none',
        placeholder: '写点什么...',
        includeChildren: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose dark:prose-invert',
          'mx-auto min-h-full max-w-screen p-8 focus:outline-none sm:max-w-prose',
          'prose-headings:text-primary prose-headings:font-semibold prose-headings:text-balance prose-headings:scroll-mt-20 prose-headings:relative',
          'prose-headings:before:absolute prose-headings:before:right-full prose-headings:before:text-primary/40',
          'prose-headings:before:content-["#"] prose-headings:before:opacity-0 prose-headings:hover:before:opacity-100 prose-headings:before:transition-opacity',
          'prose-a:text-primary prose-strong:text-primary',
          'prose-inline-code:before:content-none prose-inline-code:after:content-none',
          'prose-inline-code:border prose-inline-code:border-border prose-inline-code:bg-muted',
          'prose-inline-code:px-1.5 prose-inline-code:py-0.5 prose-inline-code:mx-1',
          'prose-inline-code:font-semibold prose-inline-code:text-foreground prose-inline-code:font-mono',
        ),
      },
      handleKeyDown: (_view, event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
          event.preventDefault()

          if (note && editor) {
            const json = editor.getJSON()
            updateNote(note.id, json)
            toast.success('笔记已保存')
          }

          return true
        }

        return false
      },
    },
    content: { type: 'doc', content: [] },
    onUpdate: ({ editor }) => {
      if (note) {
        const json = editor.getJSON()
        updateNote(note.id, json)
      }
    },
  })
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive('bold') ?? false,
      canBold: editor.can().chain().toggleBold().run() ?? false,
      isItalic: editor.isActive('italic') ?? false,
      canItalic: editor.can().chain().toggleItalic().run() ?? false,
      isUnderline: editor.isActive('underline') ?? false,
      canUnderline: editor.can().chain().toggleUnderline().run() ?? false,
      isStrikethrough: editor.isActive('strike') ?? false,
      canStrikethrough: editor.can().chain().toggleStrike().run() ?? false,
      isCode: editor.isActive('code') ?? false,
      canCode: editor.can().chain().toggleCode().run() ?? false,
      canClearMarks: editor.can().chain().unsetAllMarks().run() ?? false,
      isParagraph: editor.isActive('paragraph') ?? false,
      isHeading1: editor.isActive('heading', { level: 1 }) ?? false,
      isHeading2: editor.isActive('heading', { level: 2 }) ?? false,
      isHeading3: editor.isActive('heading', { level: 3 }) ?? false,
      isHeading4: editor.isActive('heading', { level: 4 }) ?? false,
      isHeading5: editor.isActive('heading', { level: 5 }) ?? false,
      isHeading6: editor.isActive('heading', { level: 6 }) ?? false,
      isOrderedList: editor.isActive('orderedList') ?? false,
      isBulletList: editor.isActive('bulletList') ?? false,
      isCodeBlock: editor.isActive('codeBlock') ?? false,
      isBlockquote: editor.isActive('blockquote') ?? false,
      canUndo: editor.can().chain().undo().run() ?? false,
      canRedo: editor.can().chain().redo().run() ?? false,
    }),
  })

  useEffect(() => {
    if (open && editor) {
      const notes = getNotes()
      let currentNote: Note

      if (notes.length === 0) {
        currentNote = createNote()
      } else {
        currentNote = notes[0]
      }

      setNote(currentNote)
      editor.commands.setContent(currentNote.content)
    }
  }, [open, editor])

  if (!editor) {
    return null
  }

  return (
    <>
      <EditorToolbar editor={editor} editorState={editorState} />
      <EditorContent editor={editor} className="flex-1 overflow-auto" />
      <BubbleMenu editor={editor} options={{ placement: 'top', offset: 8, flip: true }} className="hidden lg:block">
        <EditorToolbar editor={editor} editorState={editorState} />
      </BubbleMenu>
    </>
  )
}
