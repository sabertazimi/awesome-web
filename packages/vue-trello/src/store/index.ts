import { InjectionKey } from 'vue';
import { createStore, useStore, Store } from 'vuex';
import { getDefaultBoard, TaskType } from 'src/services';
import type { BoardType } from 'src/services';
import { nanoid } from 'nanoid';

interface State {
  board: BoardType;
}

type AppStore = Store<State>;

const key: InjectionKey<AppStore> = Symbol('state');

const board: BoardType =
  JSON.parse(localStorage.getItem('@sabertazimi/vue-trello-board') as string) ||
  getDefaultBoard();

const saveStatePlugin = (store: AppStore) => {
  store.subscribe((_, state) => {
    localStorage.setItem(
      '@sabertazimi/vue-trello-board',
      JSON.stringify(state.board)
    );
  });
};

const store = createStore<State>({
  state: { board },
  getters: {
    getTask: state => (id: string) => {
      for (const column of state.board.columns) {
        for (const task of column.tasks) {
          if (task.id === id) {
            return task;
          }
        }
      }
    },
  },
  mutations: {
    createTask(
      state,
      { columnIndex, name }: { columnIndex: number; name: string }
    ) {
      const tasks = state.board.columns[columnIndex].tasks;
      tasks.push({ id: nanoid(), name, description: '' });
    },
    updateTask(
      state,
      {
        task,
        key,
        value,
      }: { task: TaskType; key: keyof TaskType; value: string }
    ) {
      task[key] = value;
    },
    deleteTask(
      state,
      { columnIndex, taskId }: { columnIndex: number; taskId: string }
    ) {
      const tasks = state.board.columns[columnIndex].tasks;
      tasks.splice(
        tasks.findIndex(task => task.id === taskId),
        1
      );
    },
    moveTask(
      state,
      {
        fromColumnIndex,
        toColumnIndex,
        fromTaskIndex,
        toTaskIndex,
      }: {
        fromColumnIndex: number;
        toColumnIndex: number;
        fromTaskIndex: number;
        toTaskIndex: number;
      }
    ) {
      const fromTasks = state.board.columns[fromColumnIndex].tasks;
      const toTasks = state.board.columns[toColumnIndex].tasks;
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      if (typeof toTaskIndex === 'undefined') toTasks.push(taskToMove);
      else toTasks.splice(toTaskIndex, 0, taskToMove);
    },
    moveColumn(
      state,
      {
        fromColumnIndex,
        toColumnIndex,
      }: {
        fromColumnIndex: number;
        toColumnIndex: number;
      }
    ) {
      const columnList = state.board.columns;
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0];
      columnList.splice(toColumnIndex, 0, columnToMove);
    },
  },
  actions: {},
  plugins: [saveStatePlugin],
  modules: {},
});

const useAppStore = () => useStore<State>(key);

export { key, useAppStore };
export type { State, AppStore };
export default store;
