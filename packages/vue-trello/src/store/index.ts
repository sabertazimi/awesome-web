import { InjectionKey } from 'vue';
import { createStore, useStore, Store } from 'vuex';
import { getDefaultBoard } from 'src/services';
import type { BoardType } from 'src/services';

interface State {
  board: BoardType;
}

type AppStore = Store<State>;

const key: InjectionKey<AppStore> = Symbol('state');

const board: BoardType =
  JSON.parse(localStorage.getItem('board') as string) || getDefaultBoard();

const saveStatePlugin = (store: AppStore) => {
  store.subscribe((_, state) => {
    localStorage.setItem('board', JSON.stringify(state.board));
  });
};

const store = createStore<State>({
  state: { board },
  mutations: {},
  actions: {},
  plugins: [saveStatePlugin],
  modules: {},
});

const useAppStore = () => useStore<State>(key);

export { key, useAppStore };
export type { State, AppStore };
export default store;
