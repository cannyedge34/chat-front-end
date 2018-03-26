<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ListErrors :errors="errors"/>
          <form v-on:submit.prevent="onPublish(room)">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="room.title"
                  placeholder="Room Title">
              </fieldset>
            </fieldset>
            <button
              :disabled="inProgress"
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit">
              Publish Room
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import ListErrors from "@/components/ListErrors/ListErrors";
import { ROOM_RESET_STATE, ROOM_PUBLISH } from "@/store/actions-type";

export default {
  name: "RoomNew",
  components: { ListErrors },
  async beforeRouteEnter(to, from, next) {
    // Reset state if user goes from /rooms/:id to /rooms or /rooms/new
    // The component is not recreated so we use to hook to reset the state.
    // and running it somewhere here
    await store.dispatch(ROOM_RESET_STATE);
    await store.dispatch(ROOM_RESET_STATE);
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(ROOM_RESET_STATE);
    next();
  },
  data() {
    return {
      inProgress: false,
      errors: {}
    };
  },
  computed: {
    ...mapGetters(["room"])
  },
  methods: {
    onPublish(room) {
      let action = ROOM_PUBLISH;
      this.inProgress = true;
      this.$store
        .dispatch(action)
        .then(({ data }) => {
          this.inProgress = false;
          this.$router.push({
            name: "Rooms",
            params: { id: data.id }
          });
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data;
        });
    }
  }
};
</script>
<style lang="css">
.form-control:focus {
  border-color: #5db7de !important;
  box-shadow: 0 0 5px rgba(93, 183, 222, 1) !important;
}
.btn-primary {
  color: #fff;
  background-color: #5db7de !important;
  border-color: #5db7de !important;
}
.btn-primary:hover {
  color: #fff;
  background-color: #4d96b6 !important;
  border-color: #4d96b6 !important;
}
.error-messages {
  color: rgb(224, 64, 64) !important;
  font-weight: bold;
}
</style>