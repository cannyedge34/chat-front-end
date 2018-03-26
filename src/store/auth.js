/* global localStorage */
import User from "@/models/User";
import * as MutationTypes from "./mutations-type";

const initialState = {
  user: User.from(localStorage.token)
};

export const state = Object.assign({}, initialState);

const mutations = {
  [MutationTypes.SIGNUP](state) {
    state.user = User.from(localStorage.token);
  },
  [MutationTypes.LOGIN](state) {
    state.user = User.from(localStorage.token);
  },
  [MutationTypes.LOGOUT](state) {
    state.user = null;
  }
};

const actions = {
  signup({ commit }) {
    commit(MutationTypes.SIGNUP);
  },

  login({ commit }) {
    commit(MutationTypes.LOGIN);
  },

  logout({ commit }) {
    commit(MutationTypes.LOGOUT);
  }
};

const getters = {
  currentUser(state) {
    return state.user;
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
