import Vue from "vue";
import axios from "../backend/vue-axios/axios";
import JwtService from "@/common/jwt.service";

const ApiService = {
  post(resource, params, headers) {
    return axios.post(`${resource}`, params, headers);
  },

  get(resource, id, headers) {
    return axios.get(`${resource}/${id}`, headers).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  }
};

export default ApiService;

export const RoomsService = {
  create(params) {
    return ApiService.post(
      "/rooms",
      {
        title: params.room.title
      },
      {
        headers: {
          Authorization: "Bearer " + JwtService.getToken()
        }
      }
    );
  },
  get(id) {
    return ApiService.get("rooms", id, {
      headers: {
        Authorization: "Bearer " + JwtService.getToken()
      }
    });
  }
};

export const MessagesService = {
  get(id) {
    if (typeof id !== "string") {
      throw new Error("MessagesService.get() room required to fetch messages");
    }
    return ApiService.get("rooms", `${id}/messages`, {
      headers: {
        Authorization: "Bearer " + JwtService.getToken()
      }
    });
  },

  post(id, payload) {
    return ApiService.post(
      `rooms/${id}/messages`,
      { content: payload },
      {
        headers: {
          Authorization: "Bearer " + JwtService.getToken()
        }
      }
    );
  }
};
