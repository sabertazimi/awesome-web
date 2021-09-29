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
    createTask(state, { tasks, name }: { tasks: TaskType[]; name: string }) {
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
    deleteTask(state, { tasks, id }: { tasks: TaskType[]; id: string }) {
      tasks.splice(
        tasks.findIndex(task => task.id === id),
        1
      );
    },
    moveTask(
      state,
      {
        fromColumnIndex,
        toColumnIndex,
        fromTaskIndex,
      }: {
        fromColumnIndex: number;
        toColumnIndex: number;
        fromTaskIndex: number;
      }
    ) {
      const fromTasks = state.board.columns[fromColumnIndex].tasks;
      const toTasks = state.board.columns[toColumnIndex].tasks;
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.push(taskToMove);
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
