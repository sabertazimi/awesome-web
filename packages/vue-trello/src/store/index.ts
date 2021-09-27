import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
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

export { key };
export type { State };
export default store;
