<template>
  <div>
    <div class="page-header">
      <div class="float-right">
        <input type="text" name="search" v-model="search" placeholder="Search Chat Room" class="form-control" />
      </div>
      <h1>All Chat rooms</h1>
        <router-link :to="{name: 'RoomNew'}" replace>
          <button type="button" class="btn btn-primary">Add new room</button>
        </router-link>
    </div>
    <div class="row">
      <Bucket v-for="room in rooms" :key="room.id" :room="room" :createdby="room.created_by" v-show="searchMatch(room.title)"></Bucket>
    </div>
  </div>
</template>

<script>
import Bucket from "./Bucket";

export default {
  name: "List",
  data() {
    return {
      search: "",
      rooms: []
    };
  },
  created() {
    this.$http
      .get("/rooms", {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then(res => {
        this.buildRoomList(res.data);
      })
      .catch(() => {
        alert("Something went wrong!");
      });
  },
  methods: {
    buildRoomList(data) {
      this.rooms = data;
    },
    searchMatch(roomTitle) {
      return roomTitle.toLowerCase().match(this.searchRegExp);
    }
  },
  computed: {
    searchRegExp() {
      return new RegExp(`(.*)${this.search}(.*)`);
    }
  },
  components: {
    Bucket
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
.page-header {
  margin-bottom: 15px;
}
</style>