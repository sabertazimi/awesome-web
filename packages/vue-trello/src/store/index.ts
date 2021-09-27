import { InjectionKey } from 'vue';
import { createStore, useStore, Store } from 'vuex';
import { getDefaultBoard } from 'src/services';
import type { BoardType } from 'src/services';

interface State {
  board: BoardType;
}

const board: BoardType =
  JSON.parse(localStorage.getItem('board') as string) || getDefaultBoard();

const key: InjectionKey<Store<State>> = Symbol('state');

const store = createStore<State>({
  state: { board },
  mutations: {},
  actions: {},
  modules: {},
});

const useAppStore = () => useStore<State>(key);

export { key, useAppStore };
export type { State };
export default store;
