import Vue from "vue";
import Router from "vue-router";
import SignUp from "@/components/SignUp/SignUp";
import Login from "@/components/Login/Login";
import Logout from "@/components/Logout/Logout";
import RoomsList from "@/components/Rooms/List";
import RoomNew from "@/views/Rooms/New";
import Room from "@/views/Rooms/Room";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout
    },
    {
      path: "/rooms",
      name: "Rooms",
      component: RoomsList
    },
    {
      path: "/rooms/new",
      name: "RoomNew",
      props: true,
      component: RoomNew
    },
    {
      path: "/rooms/:id",
      name: "Room",
      component: Room,
      props: true
    }
  ]
});
