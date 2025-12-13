import type { JSONContent } from '@tiptap/react'
import type { Note } from '@/api/reviews'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NotesState {
  notes: Note[]
  // Actions
  createNote: (content?: JSONContent | null) => Note
  updateNote: (id: string, content: JSONContent) => Note | null
  deleteNote: (id: string) => boolean
  getNotes: () => Note[]
  importData: (notes: Note[]) => void
  exportData: () => Note[]
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],

      createNote: (content = null) => {
        const note: Note = {
          id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
          content: content || { type: 'doc', content: [] },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set(state => ({
          notes: [...state.notes, note],
        }))

        return note
      },

      updateNote: (id, content) => {
        let updatedNote: Note | null = null

        set((state) => {
          const index = state.notes.findIndex(n => n.id === id)
          if (index === -1) {
            return state
          }

          updatedNote = {
            ...state.notes[index],
            content,
            updatedAt: new Date().toISOString(),
          }
          const newNotes = [...state.notes]
          newNotes[index] = updatedNote

          return { notes: newNotes }
        })

        return updatedNote
      },

      deleteNote: (id) => {
        let deleted = false

        set((state) => {
          const filtered = state.notes.filter(n => n.id !== id)
          deleted = filtered.length !== state.notes.length
          return { notes: filtered }
        })

        return deleted
      },

      getNotes: () => {
        return get().notes
      },

      importData: (notes) => {
        set({ notes })
      },

      exportData: () => {
        return get().notes
      },
    }),
    {
      name: 'm-league-data',
      partialize: state => ({ notes: state.notes }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as { notes?: Note[] }
        return {
          ...currentState,
          notes: persisted.notes || currentState.notes,
        }
      },
    },
  ),
)
