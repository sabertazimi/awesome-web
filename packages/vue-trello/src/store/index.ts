import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { createStore, useStore } from 'vuex'
import { nanoid } from 'nanoid'
import { getDefaultBoard } from '../services'
import type { BoardColumnType, BoardType, TaskType } from '../services'

interface State {
  board: BoardType
}

type AppStore = Store<State>

const key: InjectionKey<AppStore> = Symbol('state')

const board: BoardType
  = JSON.parse(localStorage.getItem('@sabertazimi/vue-trello-board') as string) as BoardType
  || getDefaultBoard()

function saveStatePlugin(store: AppStore) {
  store.subscribe((_, state) => {
    localStorage.setItem(
      '@sabertazimi/vue-trello-board',
      JSON.stringify(state.board),
    )
  })
}

const store = createStore<State>({
  state: { board },
  getters: {
    getTask: state => (id: string) => {
      for (const column of state.board.columns) {
        for (const task of column.tasks) {
          if (task.id === id)
            return task
        }
      }
    },
  },
  mutations: {
    createTask(
      state,
      { columnIndex, name }: { columnIndex: number, name: string },
    ) {
      const tasks = state.board.columns[columnIndex].tasks
      tasks.push({ id: nanoid(), name, description: '' })
    },
    updateTask(
      state,
      {
        task,
        key,
        value,
      }: { task: TaskType, key: keyof TaskType, value: string },
    ) {
      if (task)
        task[key] = value
    },
    deleteTask(
      state,
      { columnIndex, taskId }: { columnIndex: number, taskId: string },
    ) {
      const tasks = state.board.columns[columnIndex].tasks
      tasks.splice(
        tasks.findIndex(task => task.id === taskId),
        1,
      )
    },
    moveTask(
      state,
      {
        fromColumnIndex,
        toColumnIndex,
        fromTaskIndex,
        toTaskIndex,
      }: {
        fromColumnIndex: number
        toColumnIndex: number
        fromTaskIndex: number
        toTaskIndex?: number
      },
    ) {
      const fromTasks = state.board.columns[fromColumnIndex].tasks
      const toTasks = state.board.columns[toColumnIndex].tasks
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex ?? toTasks.length, 0, taskToMove)
    },
    createColumn(state, { name }: { name: string }) {
      const newColumn: BoardColumnType = {
        id: nanoid(),
        name,
        tasks: [],
      }
      state.board.columns.push(newColumn)
    },
    deleteColumn(state, { id }: { id: string }) {
      state.board.columns.splice(
        state.board.columns.findIndex(column => column.id === id),
        1,
      )
    },
    moveColumn(
      state,
      {
        fromColumnIndex,
        toColumnIndex,
      }: {
        fromColumnIndex: number
        toColumnIndex: number
      },
    ) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
  },
  actions: {},
  plugins: [saveStatePlugin],
  modules: {},
})

const useAppStore = () => useStore<State>(key)

export { key, useAppStore }
export type { State, AppStore }
export default store
