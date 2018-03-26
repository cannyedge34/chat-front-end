import Vue from "vue";
import { RoomsService, MessagesService } from "@/common/api.service";
import {
  ROOM_PUBLISH,
  ROOM_RESET_STATE,
  FETCH_ROOM,
  FETCH_MESSAGES,
  MESSAGE_CREATE
} from "./actions-type";
import { RESET_STATE, SET_ROOM, SET_MESSAGES } from "./mutations-type";

const initialState = {
  room: {
    title: ""
  },
  messages: []
};

export const state = Object.assign({}, initialState);

export const actions = {
  [FETCH_ROOM](context, roomId, prevRoom) {
    // avoid multiple network call if room exists
    if (prevRoom !== undefined) {
      return context.commit(SET_ROOM, prevRoom);
    }
    return RoomsService.get(roomId).then(({ data }) => {
      context.commit(SET_ROOM, data);
      return data;
    });
  },
  [FETCH_MESSAGES](context, roomId) {
    return MessagesService.get(roomId).then(({ data }) => {
      context.commit(SET_MESSAGES, data);
    });
  },
  [MESSAGE_CREATE](context, payload) {
    return MessagesService.post(payload.id, payload.message).then(() => {
      context.dispatch(FETCH_MESSAGES, payload.id);
    });
  },

  [ROOM_PUBLISH]({ state }) {
    return RoomsService.create(state);
  },
  [ROOM_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

export const mutations = {
  [SET_ROOM](state, room) {
    state.room = room;
  },
  [SET_MESSAGES](state, messages) {
    state.messages = messages;
  },
  [RESET_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const getters = {
  room(state) {
    return state.room;
  },
  messages(state) {
    return state.messages;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
