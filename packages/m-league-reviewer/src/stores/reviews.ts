import type { Review } from '@/api/reviews'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ReviewsState {
  reviews: Review[]
  // Actions
  createReview: (date: string, title: string, content?: string, teams?: string[]) => Review
  updateReview: (id: string, updates: Partial<Omit<Review, 'id' | 'createdAt'>>) => Review | null
  deleteReview: (id: string) => boolean
  getReviewById: (id: string) => Review | undefined
  getReviewsByDate: (date: string) => Review[]
  importData: (reviews: Review[]) => void
  exportData: () => Review[]
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: [],

      createReview: (date, title, content = '', teams = []) => {
        const newReview: Review = {
          id: `review-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
          date,
          title,
          linkA: 'https://docs.qq.com/sheet/DZGJMY2JHelBXSlp6?tab=BB08J2',
          linkB: '',
          teams,
          status: 'in_progress',
          socialUrl: 'https://m-league.jp/games',
          tableA: [],
          tableB: [],
          content,
          createdAt: new Date().toISOString(),
        }

        set(state => ({
          reviews: [...state.reviews, newReview],
        }))

        return newReview
      },

      updateReview: (id, updates) => {
        let updatedReview: Review | null = null

        set((state) => {
          const index = state.reviews.findIndex(review => review.id === id)
          if (index === -1) {
            return state
          }

          updatedReview = { ...state.reviews[index], ...updates }
          const newReviews = [...state.reviews]
          newReviews[index] = updatedReview

          return { reviews: newReviews }
        })

        return updatedReview
      },

      deleteReview: (id) => {
        let deleted = false

        set((state) => {
          const filtered = state.reviews.filter(review => review.id !== id)
          deleted = filtered.length !== state.reviews.length
          return { reviews: filtered }
        })

        return deleted
      },

      getReviewById: (id) => {
        return get().reviews.find(review => review.id === id)
      },

      getReviewsByDate: (date) => {
        return get().reviews.filter(review => review.date === date)
      },

      importData: (reviews) => {
        set({ reviews })
      },

      exportData: () => {
        return get().reviews
      },
    }),
    {
      name: 'm-league-reviews',
      migrate: (persistedState: unknown) => {
        // Migration: check if old format exists and migrate
        const oldData = localStorage.getItem('m-league-data')
        if (oldData) {
          try {
            const parsed = JSON.parse(oldData) as { reviews?: Review[] }
            if (parsed.reviews && Array.isArray(parsed.reviews)) {
              return { reviews: parsed.reviews }
            }
          } catch {
            // Ignore migration errors
          }
        }
        return persistedState as { reviews: Review[] }
      },
    },
  ),
)
