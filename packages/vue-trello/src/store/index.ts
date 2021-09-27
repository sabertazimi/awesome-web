import { createStore } from 'vuex';
import { getDefaultBoard } from 'src/services';
import type { BoardType } from 'src/services';

const board: BoardType =
  JSON.parse(localStorage.getItem('board') as string) || getDefaultBoard();

export default createStore({
  state: { board },
  mutations: {},
  actions: {},
  modules: {},
});
