import type { Note } from '@/api/reviews'
import { Placeholder } from '@tiptap/extensions'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import { createNote, getNotes, updateNote } from '@/api/reviews'

export function NoteEditor({ open }: { open: boolean }) {
  const [note, setNote] = useState<Note | null>(null)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        emptyNodeClass:
          'before:content-[attr(data-placeholder)] before:float-left before:text-muted-foreground before:h-0 before:pointer-events-none',
        placeholder: '写点什么...',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose dark:prose-invert prose-strong:text-primary mx-auto min-h-full p-8 focus:outline-none',
      },
      handleKeyDown: (_view, event) => {
        // 处理 Ctrl+S / Cmd+S 保存
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
          event.preventDefault()

          if (note && editor) {
            const json = editor.getJSON()
            updateNote(note.id, json)
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

  return <EditorContent className="flex-1 overflow-auto" editor={editor} />
}
