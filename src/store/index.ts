/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import { MutationTree } from 'vuex'

Vue.use(Vuex);

interface Goods {
  number: number;
  select: Boolean;
  id: string;
}

export interface State {
  goodsData: Goods[];
}

const mutations: MutationTree<State> = {
  addGoods: (state,goodsItem: Goods) => {
    let isFind = state.goodsData.some((item: Goods) => {
      if (item.id === goodsItem.id) {
        item.number += 1;
        return true;
      }
      return false;
    });
    if (!isFind) {
      Vue.set(goodsItem, "number", 1);
      Vue.set(goodsItem, "select", true);
      state.goodsData.push(goodsItem);
    }
  }
}

// initial state
// shape: [{ id, quantity }]
const state: State = {
  goodsData: []
};

export default new Vuex.Store<State>({
  state,
  mutations,
});
