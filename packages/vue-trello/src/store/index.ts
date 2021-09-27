import { createStore } from 'vuex';
import { getDefaultBoard } from '@/services';
import type { BoardType } from '@/services';

const board: BoardType =
  JSON.parse(localStorage.getItem('board') as string) || getDefaultBoard();

export default createStore({
  state: { board },
  mutations: {},
  actions: {},
  modules: {},
});
