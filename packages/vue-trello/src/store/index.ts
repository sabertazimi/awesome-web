import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import type { BoardColumnType, BoardType, TaskType } from '../services'
import { nanoid } from 'nanoid'
import { createStore, useStore } from 'vuex'
import { getDefaultBoard } from '../services'

interface State {
  board: BoardType
}

type AppStore = Store<State>

const key: InjectionKey<AppStore> = Symbol('state')

const board: BoardType
  // eslint-disable-next-line ts/strict-boolean-expressions -- return default board if null.
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
      // eslint-disable-next-line security/detect-object-injection -- columnIndex is safe.
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
      // eslint-disable-next-line ts/strict-boolean-expressions -- `task` may be null.
      if (task)
        // eslint-disable-next-line security/detect-object-injection -- key is safe.
        task[key] = value
    },
    deleteTask(
      state,
      { columnIndex, taskId }: { columnIndex: number, taskId: string },
    ) {
      // eslint-disable-next-line security/detect-object-injection -- columnIndex is safe.
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
      // eslint-disable-next-line security/detect-object-injection -- columnIndex is safe.
      const fromTasks = state.board.columns[fromColumnIndex].tasks
      // eslint-disable-next-line security/detect-object-injection -- columnIndex is safe.
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
export type { AppStore, State }
export default store
